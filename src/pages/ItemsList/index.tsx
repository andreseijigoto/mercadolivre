import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { getProducts } from '../../services/api';

import IProduct from '../../models/api.product.model';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import ProductList from '../../components/ProductList';

import './styles.css';

const ItemList = () => {

  const query = new URLSearchParams(useLocation().search);
  const [error, setError] = useState<boolean>(false);
  const [items, setItems] = useState<IProduct[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
  const limit = 4;

  let term = query.get('search') || '';

  useEffect(() => {
    let isSubscribed = true;
    getProducts(term)
      .then(res => {
        if (isSubscribed) {
          setError(res.error);
          setBreadcrumbs(res.categories);
          setItems(res.items || []);
        }
      });
    return () => { isSubscribed = false };
  }, [term]);

  return (
    <div id="page-item-list">
      <Header query={term}/>
      <main>
        <div className="container">
          { !error && breadcrumbs.length ? <Breadcrumb items={breadcrumbs} /> : null }
          { !error && items.length ? <ProductList items={items} limit={limit} /> : null }
        </div>
      </main>
    </div>
  )
}

export default ItemList;