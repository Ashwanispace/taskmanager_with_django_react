import React,{ useState,useEffect } from 'react';
import axios from "axios";

const Learner = () => {
    const [learner, setlearner] = useState([])

    useEffect(()=>{
        const fetchdata = async ()=>{
            const response = await axios.get("http://127.0.0.1:8000/test_app/api/simple");
            setlearner(response.data);
        } 
        fetchdata();
    },[]);

  return (
    <div>
    {
        learner.map((item, index) => {
            return (
                <div key={index}>
                    <p>Name: {item.name}</p>
                    <p>Email: {item.email}</p>
                    <p>Mobile: {item.mobile}</p>
                </div>
            );
        })
    }
</div>
  )
}

export default Learner
