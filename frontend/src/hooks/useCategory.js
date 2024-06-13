import axios from "axios";
import { useState, useEffect } from "react";

export default function useCategory(){
    const [categories, setCategories] = useState([])

    //get category
    const getCategories = async()=>{
        try {
            const {data} = await axios.get('/category/get-category')
            setCategories(data?.category);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getCategories();
    },[])
    
    return categories;
}