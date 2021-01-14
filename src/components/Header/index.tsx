import React, { MouseEvent, ChangeEvent, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

import Input from "../../components/Input";
import Button from "../../components/Button";
import logo from '../../assets/logo.png';

import './styles.css';

interface IHeaderProps {
  query?: string;
}

const Header: React.FC<IHeaderProps> = (props) => {

  const history = useHistory();
  const [queryData, setQueryData] = useState<string>('');

  useEffect(() => {
    setQueryData(props.query||'');
  }, [props.query]);

  function handleButtonCLick(e: MouseEvent<HTMLButtonElement>): void {
    history.push(`/items?search=${queryData}`);
  }

  function handleInputValue(e: ChangeEvent<HTMLInputElement>): any {
    setQueryData(e.target.value);
  }

  return (
    <header className="header">
      <div className="container">
        <Link className="header-logo" to="/" aria-label="Mercado Livre Brasil - Onde comprar e vender de Tudo">
          <img className="logo" src={logo} alt="Logo Mercado Livre" />
        </Link>
        <div className="header-container">
          <Input name="header-search-input" value={queryData} onChange={handleInputValue} />
          <Button className="button-icon button-search" onClick={handleButtonCLick} >
            <FiSearch className="icon" />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;