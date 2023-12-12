import { TextField,Button } from "@mui/material";
import React,{useState} from "react";
import ResponsiveDrawer from "../dashboard";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const CreateTag = () => {
   
    

const [title,setTitle] = useState("");


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

   axios.post(process.env.REACT_APP_API_URL+'tags/create', {
    title: title,
    status: 1
  },
 {
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : 'bearer '+localStorage.getItem('token')
  }
 })
  .then(function (response) {
    toast.success('Tag Created Successfully.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      setTitle("");
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

      <h1 style={{ fontWeight:"bold",textTransform:"uppercase" }} >Create Tags</h1>
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
        save
      </Button>
 

    </form>
    </ResponsiveDrawer>


    )

    }


export default CreateTag;