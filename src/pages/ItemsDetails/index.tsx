import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getProductDetails, getCategories } from '../../services/api';

import IProductDetail from '../../models/api.productdetail.model';
import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Header from "../../components/Header";

import NumbersHelper from '../../helpers/numbers.helpers';

import './styles.css';

function ItemDetails() {

  const numbersHelper = new NumbersHelper();
  const { id } = useParams<{id: string}>();

  const [error, setError] = useState<boolean>(false);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
  const [product, setProduct] = useState<IProductDetail>();
  
  useEffect(() => {
    let isSubscribed = true;
    getProductDetails(id)
      .then((res:any) => {
        if (isSubscribed) {
          setError(!!res.error);
          setProduct(res);
          getCategories(res.category).then(res => setBreadcrumbs(res));
          isSubscribed = false;
        }
      });
    return () => { isSubscribed = false };
  }, [id]);
  
  return (
    <div id="page-item-details">
      <Header />
      <main>
        <div className="container">
          { !error && breadcrumbs.length ? <Breadcrumb items={breadcrumbs} /> : null }
          { product
            ? <div className="product-details">
                <div className="column-left">
                  <div className="product-picture">
                    <img src={product.item.picture[0]} alt={`Imagem do produto: ${product.item.title}`} />
                  </div>
                  <div>
                    <h2>Descrição do produto</h2>
                    <p className="product-description">{ product.item.description }</p>
                  </div>
                </div>
                <div className="column-right">
                  <p className="product-stats">
                    { product.item.condition === 'new' ? 'Novo' : 'Usado' } - { product.item.sold_quantity } vendidos
                  </p>
                  <h1 className="product-name">{ product.item.title }</h1>
                  <p className="product-price">$ {numbersHelper.setSeparator(product.item.price.amount)}</p>
                  <Button className="bg-secondary">Comprar</Button>
                </div>
              </div>
            : null }
        </div>
      </main>
    </div>
  )
}

export default ItemDetails;
