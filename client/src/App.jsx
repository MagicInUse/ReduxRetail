import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { loginSuccess } from './store/slices/authSlice';
import Nav from './components/Nav';
import { idbPromise } from './utils/helpers';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('id_token');
    if (token) {
      dispatch(loginSuccess({ token }));
    }

    // Sync IndexedDB with Redux store
    ['cart', 'products', 'categories'].forEach(async store => {
      const data = await idbPromise(store, 'get');
      if (data.length) {
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