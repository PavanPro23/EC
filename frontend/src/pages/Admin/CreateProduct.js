import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd';
import { useNavigate } from 'react-router-dom';
const {Option} = Select
const CreateProduct = () => {

  const [categories,setCategories] = useState([]);
  const [name,setName] = useState("");
  const [category,setCategory] = useState("");
  const [description,setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const navigate = useNavigate();
  const [photo,setPhoto] = useState({})

  const handleImage = async(e)=>{
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image",file);

    try{
      const {data} = await axios.post("/product/upload" , formData);
      setPhoto({
        url: data.url,
        public_id: data.public_id
      });
      console.log("Uploaded", data);
    }
    catch(error){
      console.log(error);
    }

  }

  const getAllCategory = async()=>{
    try{
        const {data} = await axios.get('/category/get-category')
        if(data?.success){
          setCategories(data?.category);
        }
    }
    catch(error){
      console.log(error);
      toast.error('Something went wrong in getting category')
    }
  }

  useEffect(()=>{getAllCategory()},[])


  const handleCreate = async(e)=>{
    e.preventDefault();
    try{
        const {data} = await axios.post('/product/create-product', {
          name, description, price, quantity, photo: photo?.url, category, shipping
        });
        if(data?.success){
          toast.success(data?.message);
          navigate('/dashboard/admin/products');
        }else{
          toast.success("Product Created Successfully");
          navigate('/dashboard/admin/products');
        }
    }
    catch(error){
      toast.error("Something went wrong in creating product");
    }
  }
  return (
    <Layout title={"All Users"}>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                    <div className="col-md-3">
                    <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                    <h3>Create Proucts</h3>
                    <div className='m-1 w-75'>
                      <Select bordered={false} placeholder="Select a category" size='large' showSearch className="form-select mb-3" onChange={(value)=>{setCategory(value)}}>
                          {
                            categories?.map((c)=>(
                                <Option key={c._id} value={c._id}>{c.name}</Option>
                            ))
                          }
                      </Select>
                      <div className='mb-3'>
                        <label htmlFor='image' className='form-label'>Image</label>
                        <input type="file" name='photo' className='form-control' placeholder='Upload Image' onChange={handleImage}>
                        
                        </input>
                        {photo?.url && (<img src={photo.url} alt='' className='img-thumbnail mt-3' style={{width:'7rem', height: '7rem'}} />)}
                      </div>
                      <div className="mb-3">
                          <input type="text" value={name} placeholder="Write a name" className='form-control' onChange={(e)=>setName(e.target.value)}></input>
                      </div>
                      <div className="mb-3">
                          <textarea type="text" value={description} placeholder="Write a Description" className='form-control' onChange={(e)=>setDescription(e.target.value)}></textarea>
                      </div>
                      <div className="mb-3">
                          <input type="number" value={price} placeholder="Write a Price" className='form-control' onChange={(e)=>setPrice(e.target.value)}></input>
                      </div>
                      <div className="mb-3">
                          <input type="number" value={quantity} placeholder="Write a Quantity" className='form-control' onChange={(e)=>setQuantity(e.target.value)}></input>
                      </div>
                      <div className="mb-3">
                          <Select variant={false} placeholder="Select Shipping" size='large' showSearch className='form-select mb-3' onChange={(value)=>setShipping(value)}>
                              <Option value="0">No</Option>
                              <Option value="1">Yes</Option>
                          </Select>
                      </div>
                      <div className="mb-3">
                          <button className='btn btn-primary' onClick={handleCreate}>Create Product</button>
                      </div>
                    </div>
                    </div>
                </div>
            </div>
    </Layout>
  )
}

export default CreateProduct
