import React from 'react';
import { Link } from 'react-router-dom';
import NumbersHelper from '../../helpers/numbers.helpers';
import IProduct from '../../models/api.product.model';

import './styles.css';

interface IProductListItem {
  item: IProduct;
}

const ProductListItem: React.FC<IProductListItem> = ({item}) => {
  let numbersHelper = new NumbersHelper();

  return (
    <article className="product-list-item">
      <div className="product-picture">
        <Link to={`/items/${item.id}`}>
          <img src={item.picture} alt={`Imagem do produto: ${item.title}`} />
        </Link>
      </div>
      <div className="product-details">
        <Link to={`/items/${item.id}`}>
          <div className="product-price">
            $ {numbersHelper.setSeparator(item.price.amount)}
          </div>
          <h2 className="product-name">{item.title}</h2>
        </Link>
      </div>
      <div className="product-location">
        {item.location.city_name}
      </div>
    </article>
  )
}

export default ProductListItem;