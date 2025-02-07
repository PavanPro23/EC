import React from 'react'
import { useSearch } from '../../context/search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SearchInput = () => {

    const [values,setValues] = useSearch()
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const {data} = await axios.get(`/product/search/${values?.keyword}`)
            setValues({...values,results:data});
            navigate('/search')
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <div>
        <form className='d-flex' role='search' onSubmit={handleSubmit}>
            <input type='search' className='form-control me-2' placeholder='Search what you want!!!' value={values?.keyword} onChange={(e)=>setValues({...values,keyword:e.target.value})} aria-label='Search'/>
            <button className='btn btn-outline-success' type='submit'>Search</button>
        </form>
        </div>
    )
}

export default SearchInput
