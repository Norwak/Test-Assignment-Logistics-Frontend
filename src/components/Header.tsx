import {Container, Select} from '@gravity-ui/uikit';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import { setIsAdmin } from '../store/isAdmin.slice';

export default function Header() {
  const isAdmin = useSelector((state: RootState) => state.isAdmin.value);
  const dispatch = useDispatch();

  return (
    <header className='header ptb15'>
      <Container maxWidth='l'>
        <div className="header__inner">
          <div className="flex-csb rowrev gap15">

            <div className="header__switch">
              <Select value={isAdmin} onUpdate={(nextValue) => dispatch(setIsAdmin(nextValue))}>
                <Select.Option value='false'>Сайт</Select.Option>
                <Select.Option value='true'>Админ панель</Select.Option>
              </Select>
            </div>

            {isAdmin.includes('true') && (
              <nav className="header__menu flex-cl gap15">
                <div className="header__menu-item">
                  <Link to="/admin/offers/">Заявки</Link>
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