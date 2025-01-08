import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { logout } from '../../store/slices/authSlice';
import Auth from "../../utils/auth";

function Nav() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    Auth.logout();
    dispatch(logout());
  };

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="shopping bag">🛍️</span>
          -Shop-Shop
        </Link>
      </h1>
      <nav>
        {user ? (
          <ul className="flex-row">
            <li className="mx-1">
              <Link to="/orderHistory">Order History</Link>
            </li>
            <li className="mx-1">
              <button
                onClick={handleLogout}
                className="btn"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0',
                  color: '#1a1a1a',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className="flex-row">
            <li className="mx-1">
              <Link to="/signup">Signup</Link>
            </li>
            <li className="mx-1">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Nav;