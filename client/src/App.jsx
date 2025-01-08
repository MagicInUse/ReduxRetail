import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { loginSuccess } from './store/slices/authSlice';
import Auth from './utils/auth';
import Nav from './components/Nav';
import { idbPromise } from './utils/helpers';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check auth on mount
    if (Auth.loggedIn()) {
      const token = Auth.getToken();
      const user = Auth.getProfile();
      dispatch(loginSuccess({ token, user }));
    }

    // Sync IndexedDB with Redux store
    ['cart', 'products', 'categories'].forEach(async store => {
      const data = await idbPromise(store, 'get');
      if (data?.length) {
        switch(store) {
          case 'cart':
            dispatch({ type: 'cart/addMultipleToCart', payload: data });
            break;
          case 'products':
            dispatch({ type: 'products/updateProducts', payload: data });
            break;
          case 'categories':
            dispatch({ type: 'categories/updateCategories', payload: data });
            break;
        }
      }
    });
  }, [dispatch]);

  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default App;