import React from 'react';
import ProductListItem from '../ProductListItem';
import IProduct from '../../models/api.product.model';

import './styles.css';

interface IProductList {
  items: IProduct[];
  limit: number;
}

const ProductList: React.FC<IProductList> = ({items, limit}) => {

  return (
    <section className="product-list">
      {items.slice(0, limit).map(item => <ProductListItem key={item.id} item={item} />)}
    </section>
  )
}

export default ProductList;