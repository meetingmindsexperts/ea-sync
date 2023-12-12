import { TextField,Button } from "@mui/material";
import React,{useState} from "react";
import ResponsiveDrawer from "../dashboard";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {useEffect} from 'react';
import { useParams } from "react-router-dom";

const EditTag = () => {

  const { id } = useParams();

const [title,setTitle] = useState("");


const fetchTag = async () => {
  const response = await axios.get(process.env.REACT_APP_API_URL+'tags/view/'+id, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'bearer '+localStorage.getItem('token')
    }
});
  setTitle(response.data.title);
  // setLoading(false);
};

useEffect(() =>{
  fetchTag()


},[]);
const submitHandler = () => {

   if(title === ""){
    toast.error('Title is required', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    return;
   }

   axios.patch(process.env.REACT_APP_API_URL+'tags/update/'+id, {
    title: title,
  },
 {
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : 'bearer '+localStorage.getItem('token')
  }
 })
  .then(function (response) {
    toast.success('Tag Updated Successfully.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  })
  .catch(function (error) {
    toast.error('There is something wrong, Please try again', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  });

}

    return (
    
      <ResponsiveDrawer>

      <h1 style={{ fontWeight:"bold",textTransform:"uppercase" }} >Update Tag</h1>
      {/* <Typography variant="h5">BASIC WITH MATERIAL UI</Typography> */}
    <form>
      <TextField
        style={{ width: "50%", margin: "5px" }}
        type="text"
        label="Enter Title"
        variant="outlined"
        value={title}
        onChange={(e)=>{setTitle(e.target.value); }}
      />
      
      <br/>
      {/* <FormControlLabel control={<Switch defaultChecked />} label="Status" /> */}


<br/>
      <Button variant="contained" onClick={()=>submitHandler()} style={{ marginLeft:'10px' }} color="primary">
        Update
      </Button>
 

    </form>
    </ResponsiveDrawer>


    )

    }


export default EditTag;