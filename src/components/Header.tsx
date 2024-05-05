import {Container, Select} from '@gravity-ui/uikit';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isAdmin, setIsAdmin] = React.useState<string[]>(['false']);

  return (
    <header className='header ptb15'>
      <Container maxWidth='l'>
        <div className="header__inner">
          <div className="flex-csb rowrev gap15">

            <div className="header__switch">
              <Select value={isAdmin} onUpdate={(nextValue) => setIsAdmin(nextValue)}>
                <Select.Option value='false'>Сайт</Select.Option>
                <Select.Option value='true'>Админ панель</Select.Option>
              </Select>
            </div>

            {isAdmin.includes('true') && (
              <nav className="header__menu flex-cl gap15">
                <div className="header__menu-item">
                  <Link to="/offers/">Заявки</Link>
                </div>
                <div className="header__menu-item">
                  <Link to="/clients/">Клиенты</Link>
                </div>
                <div className="header__menu-item">
                  <Link to="/carriers/">Перевозчики</Link>
                </div>
              </nav>
            )}

            {isAdmin.includes('false') && (
              <Link to="/">Система ведения заявок для логистов</Link>
            )}

          </div>
        </div>
      </Container>
    </header>
  );
}