import {Container, Select} from '@gravity-ui/uikit';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  let isAdmin = ['false'];
  if (/\/admin\//.test(pathname)) {
    isAdmin = ['true'];
  }

  function toggleAdmin(value: string[]) {
    if (value.includes('false')) {
      navigate('/')
    } else {
      navigate('/admin/')
    }
  }


  return (
    <header className='header ptb15'>
      <Container maxWidth='l'>
        <div className="header__inner">
          <div className="flex-csb rowrev gap15">

            <div className="header__switch">
              <Select value={isAdmin} onUpdate={toggleAdmin}>
                <Select.Option value='false'>Сайт</Select.Option>
                <Select.Option value='true'>Админ панель</Select.Option>
              </Select>
            </div>

            {isAdmin.includes('true') && (
              <nav className="header__menu flex-cl gap15">
                <div className="header__menu-item">
                  <Link to="/admin/">Заявки</Link>
                </div>
                <div className="header__menu-item">
                  <Link to="/admin/clients/">Клиенты</Link>
                </div>
                <div className="header__menu-item">
                  <Link to="/admin/carriers/">Перевозчики</Link>
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