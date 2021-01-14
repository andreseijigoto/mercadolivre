interface IProduct {
  id: string;
  title: string;
  location: {
    city_id: string;
    city_name: string;
    state_id: string;
    state_name: string;
  }
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
}

export default IProduct;