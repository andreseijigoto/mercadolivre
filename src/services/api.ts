import axios from 'axios';

function getProducts(data: string | null) {
  const api = axios.create({baseURL: 'https://api.mercadolibre.com/sites/MLA/search'});
  return api.get(`?q=${data}`)
    .then(res => res.status === 200 ? res.data : { error: true })
    .then(res => {
      if(!res.error) {
        let filters = res.filters.find((x:any) => x.id === 'category');
        let category = (filters) && filters.values.find((x:any) => x.path_from_root);
        return {
          categories: (category) ? category.path_from_root.map((x:any) => x.name) : [],
          author: {
            name: null,
            lastname: null
          },
          items: res.results.map((item:any) => ({
            id: item.id,
            title: item.title,
            location: item.address,
            price: {
              currency: item.installments.currency_id,
              amount: item.price,
              decimals: 0,
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: !!item.shipping.free_shipping
          })),
        }
      };
      return res;
    });
}

function getProductDetails(idProd: string | null) {
  const api = axios.all([
    axios.create({baseURL: 'https://api.mercadolibre.com/items'}).get(`/${idProd}`),
    axios.create({baseURL: 'https://api.mercadolibre.com/items'}).get(`/${idProd}/description`)
  ])
  return api.then(axios.spread((...res) => {
    if(res[0].status === 200) {
      const { id, title, condition, sold_quantity } = res[0].data;
      const { free_shipping } = res[0].data.shipping;
      return {
        author: { name: null, lastname: null },
        category: res[0].data.category_id as string,
        item: {
          id, title, condition, sold_quantity, free_shipping,
          price: {
            currency: res[0].data.currency_id,
            amount: res[0].data.price,
            decimals: 0,
          },
          picture: res[0].data.pictures.map((x:any) => x.url),
          description: res[1].status === 200 ? res[1].data.plain_text : null
        }
      }
    }
    return res;
  }));
}

function getCategories(idCat: string) {
  const api = axios.create({baseURL: 'https://api.mercadolibre.com/categories'});
  return api.get(`/${idCat}`)
    .then(res => res.status === 200 ? res.data : { error: true })
    .then(res => (!res.error ? res.path_from_root.map((x: any) => x.name) : res));
}

export { getProducts, getProductDetails, getCategories };