import React from 'react';

import './style.css';

interface IBreadcrumb {
  items: string[];
}

const Input: React.FC<IBreadcrumb> = ({items}) => {
  return (
    <ul className="breadcrumbs">
      {items.map((item, index) => <li className="breadcrumb-item" key={`breadcrumb-item-${index}`}>{item}</li>)}
    </ul>
  );
}

export default Input;