import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoutes from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoutes from './components/Routes/AdminRoutes';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import User from './pages/Admin/User';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import axios from 'axios';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';
axios.defaults.baseURL = "http://localhost:8080"

function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<HomePage></HomePage>}></Route>
          <Route path='/product/:slug' element={<ProductDetails></ProductDetails>}></Route>
          <Route path='/search' element={<Search></Search>}></Route>
          <Route path='/cart' element={<CartPage></CartPage>}></Route>
          <Route path='/category/:slug' element={<CategoryProduct></CategoryProduct>}></Route>
          <Route path='/categories' element={<Categories></Categories>}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
          <Route path='/dashboard' element={<PrivateRoutes />}>
            <Route path='user' element={<Dashboard></Dashboard>}></Route>
            <Route path='user/profile' element={<Profile/>}></Route>
            <Route path='user/orders' element={<Orders />}></Route>
          </Route>
          <Route path='/dashboard' element={<AdminRoutes />}>
            <Route path='admin' element={<AdminDashboard />}></Route>
            <Route path='admin/create-Category' element={<CreateCategory />}></Route>
            <Route path='admin/create-product' element={<CreateProduct />}></Route>
            <Route path='admin/products' element={<Products />}></Route>
            <Route path='admin/products/:slug' element={<UpdateProduct />}></Route>
            <Route path='admin/users' element={<User />}></Route>
            <Route path='admin/orders' element={<AdminOrders />}></Route>
          </Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/about' element={<About></About>}></Route>
          <Route path='/contact' element={<Contact></Contact>}></Route>
          <Route path='/policy' element={<Policy></Policy>}></Route>
          <Route path='/*' element={<Pagenotfound></Pagenotfound>}></Route>
      </Routes>
    </>
  );
}

export default App;
