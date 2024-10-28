import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Orders from "./pages/Orders/Orders";
import Cart from "./pages/Cart/Cart";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import PrivateRoute from "./Utils/PrivateRoute";
import { useEffect } from "react";
import { userActions } from "./redux/reducers/authReducer";
import { useDispatch } from "react-redux";
import { auth } from "./database/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { userSelector } from "./redux/reducers/authReducer";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./database/firebaseConfig";
import { useSelector } from "react-redux";
import { cartActions } from "./redux/reducers/cartReducer";
import { orderActions } from "./redux/reducers/orderReducer";



function App() {

  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(userActions.setUser(currentUser));
      dispatch(userActions.setLoading(false));
    });
    return () => {
      unsubscribe();
    };

  }, [dispatch]);

  useEffect(() => {
    const getData = async () => {

      return onSnapshot(doc(db, "carts", user.uid), (doc) => {
        if (doc.data()) {
          dispatch(cartActions.setInitialState(doc.data().cart));
        }
      });
    }
    if (user) {
      getData();
    }
  }, [user, dispatch]);

  useEffect(() => {
    const getData = async () => {
      return onSnapshot(doc(db, "orders", user.uid), (doc) => {
        if (doc.data()) {
          dispatch(orderActions.setInitialState(doc.data().order))
        }
      });
    }
    if (user) {
      getData();
    }
  }, [user, dispatch]);


  const router = createBrowserRouter([
    {
      path: '/', element: <Navbar />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/orders',
          element: (
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          )
        },
        {
          path: '/cart',
          element: (
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          )
        },
        {
          path: '/signin',
          element: <SignIn />
        },
        {
          path: '/signup',
          element: <SignUp />
        },
      ]
    }
  ]);


  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
