import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {

  const [auth, setAuth] = useAuth();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address,setAddress] = useState("");

  const handleSubmmit = async(e)=>{
    try{
      e.preventDefault();
      const {data} = await axios.put('/auth/profile',{name,email,password,phone,address})
      if(data?.error){
        toast.error(data?.error);
      }
      else{
        setAuth({...auth, user:data?.updatedUser})
        let ls = JSON.parse(localStorage.getItem('auth'))
        ls.user = data?.updatedUser;
        localStorage.setItem('auth',JSON.stringify(ls));
        toast.success("Profile Updated Successfully")
      }

    }catch(error){
      toast.error("something went wrong");
    }
  }

  useEffect(()=>{
    const {email,name,phone,address} = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user])

  return (
    <Layout title={"All Orders"}>
      <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className='col-md-9'>
              <div className='form-container'>
                  <form onSubmit={handleSubmmit}>
                    <h4 className='title'>USER PROFILE</h4>
                    <div className="mb-3">
                        <input type="text" value={name} placeholder='Enter Name' className="form-control" id="exampleInputEmail1" onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <input type="email" value={email} placeholder="Enter Email" className="form-control" id="exampleInputEmail1" disabled onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <input type="password" value={password} placeholder="Enter Password" className="form-control" id="exampleInputPassword1" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <input type="text" value={phone} placeholder='Enter Phone' className="form-control" id="exampleInputEmail1" onChange={(e)=>setPhone(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <input type="text" value={address} placeholder='Enter Address' className="form-control" id="exampleInputEmail1" onChange={(e)=>setAddress(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary">UPDATE</button>
                  </form>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Profile
