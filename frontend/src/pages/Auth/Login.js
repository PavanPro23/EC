import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import '../../styles/AuthStyles.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const location = useLocation();
  const [auth,setAuth] = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    try{
      e.preventDefault();
      const res = await axios.post('/auth/login',{email,password})
      if(res && res.data.success){
          setAuth({
            ...auth,
            user:res.data.user,
            token:res.data.token
          })
          localStorage.setItem('auth',JSON.stringify(res.data))

          toast.success(res.data.message);
          navigate(location.state || '/')
      }else{
          toast.error(res.data.message);
      }

    }catch(error){
      toast.error("something went wrong");
    }
  }

  return (
    <Layout title={"Login"}>
      <div className="form-container">
        
        <form onSubmit={handleSubmit}>
            <h4 className='title'>Login Now</h4>
            <div className="mb-3">
                <input type="email" value={email} placeholder="Enter Email" className="form-control" id="exampleInputEmail1" onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
                <input type="password" value={password} placeholder="Enter Password" className="form-control" id="exampleInputPassword1" onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
                <button type="submit" className="btn btn-primary" onClick={()=>navigate('/forgot-password')}>Forgot Password</button>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
