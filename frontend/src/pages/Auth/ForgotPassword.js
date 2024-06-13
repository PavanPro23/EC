import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import '../../styles/AuthStyles.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email,setEmail] = useState("");
  const [answer,setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    try{
      e.preventDefault();
      const res = await axios.post('/auth/forgot-password',{email,newPassword,answer})
      if(res && res.data.success){
          toast.success(res.data.message);
          navigate('/login')
      }else{
          toast.error(res.data.message);
      }

    }catch(error){
      toast.error("something went wrong");
    }
  }

  return (
    <Layout title={"Reset Password"}>
      <div className="form-container">
        
        <form onSubmit={handleSubmit}>
            <h4 className='title'>Login Now</h4>
            <div className="mb-3">
                <input type="email" value={email} placeholder="Enter Email" className="form-control" id="exampleInputEmail1" onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
                <input type="text" value={answer} placeholder="What is your Favourite Color" className="form-control" id="exampleInputEmail1" onChange={(e)=>setAnswer(e.target.value)} />
            </div>
            <div className="mb-3">
                <input type="password" value={newPassword} placeholder="Enter New Password" className="form-control" id="exampleInputPassword1" onChange={(e)=>setNewPassword(e.target.value)} />
            </div>
            
            <button type="submit" className="btn btn-primary">Reset</button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword
