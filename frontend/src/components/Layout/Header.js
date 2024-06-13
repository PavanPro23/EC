import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import {MdProductionQuantityLimits} from 'react-icons/md'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import SearchInput from '../Form/SearchInput'
import useCategory from '../../hooks/useCategory'
import { useCart } from '../../context/cart'
import { Badge } from 'antd'

const Header=()=>{
    const [auth,setAuth] = useAuth();
    const [cart] = useCart();
    const categories = useCategory();

    const handleLogout =()=>{
        setAuth({
            ...auth,
            user:null,
            token:"",
        });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
    }
    return(
        <>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <Link to="/" className="navbar-brand"><MdProductionQuantityLimits />E Commerce</Link>
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <SearchInput />
                                <li className="nav-item">
                                <NavLink to="/" className="nav-link" aria-current="page">Home</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to={'/categories'} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Categories
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className='dropdown-item' to={'/categories'}>All Categories</Link>
                                        {
                                            categories?.map((c)=>(
                                                <li>
                                                    <Link className="dropdown-item" to={`/category/${c.slug}`}>
                                                        {c?.name}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </li>
                                {!auth.user ? (
                                    <>
                                        <li className="nav-item">
                                        <NavLink to="/register" className="nav-link">Register</NavLink>
                                        </li>
                                        <li className="nav-item">
                                        <NavLink to="/login" className="nav-link">Login</NavLink>
                                        </li>
                                    </>
                                ):(
                                    <>
                                        <li className="nav-item dropdown">
                                            <NavLink href='#' className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {auth?.user?.name} 
                                            </NavLink>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">Dashboard</NavLink></li>
                                                <li>
                                                    <NavLink onClick={handleLogout} to="/login" className="dropdown-item">Logout</NavLink>
                                                </li>
                                            </ul>
                                        </li>                                        
                                    </>
                                )}
                                <li className="nav-item">
                                    <Badge count={cart.length} showZero>
                                        <NavLink to="/cart" className="nav-link">Cart</NavLink>
                                    </Badge>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </nav>
            </div>
        </>
    )
}

export default Header