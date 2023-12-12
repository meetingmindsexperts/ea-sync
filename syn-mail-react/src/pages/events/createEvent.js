import { TextField,Button } from "@mui/material";
import React,{useState,useEffect} from "react";
import ResponsiveDrawer from "../dashboard";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Autocomplete from '@mui/material/Autocomplete';

const CreateEvent = () => {
   
    

const [title,setTitle] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [url,setUrl] = useState("");
const [tagsArray, setTagsArray] = React.useState([]);
const [tags,setTags] = useState([]);


const fetchTags = async (start = 0, end = 100) => {
  const response = await axios.get(process.env.REACT_APP_API_URL+'tags/view', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'bearer '+localStorage.getItem('token')
    }
});
setTags(response.data);
};

useEffect(()=>{
fetchTags();
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

   if(email === ""){
    toast.error('Email is required', {
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

   if(password === ""){
    toast.error('Password is required', {
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

   if(url === ""){
    toast.error('URL is required', {
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

   if(tagsArray.length <= 0){
    toast.error('Tags are required', {
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
var result = [];
    tagsArray.map(function (e) {
      console.log(e);
    return result.push(e.id);

  });

   axios.post(process.env.REACT_APP_API_URL+'eventsair/create', {
    title: title,
    email: email,
    password:password,
    url:url,
    tags:result
  },
 {
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : 'bearer '+localStorage.getItem('token')
  }
 })
  .then(function (response) {
    toast.success('Event Created Successfully.', {
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
      setPassword("");
      setEmail("");
      setUrl("");
      setTagsArray([]);
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

      <h1 style={{ fontWeight:"bold",textTransform:"uppercase" }} >Create Event</h1>
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

<TextField
        style={{ width: "50%", margin: "5px" }}
        type="email"
        label="Enter Email"
        variant="outlined"
        value={email}
        onChange={(e)=>{setEmail(e.target.value); }}
      />
            <TextField
        style={{ width: "50%", margin: "5px" }}
        type="password"
        label="Enter Password"
        variant="outlined"
        value={password}
        onChange={(e)=>{setPassword(e.target.value); }}
      />
            <TextField
        style={{ width: "50%", margin: "5px" }}
        type="text"
        label="Enter Eventsair DoubleTouch API URL"
        variant="outlined"
        value={url}
        onChange={(e)=>{setUrl(e.target.value); }}
      />
       <br/>

       <Autocomplete
        multiple
        style={{ width: "50%", margin: "5px" }}
        id="tags-outlined"
        options={tags}
        onChange={(event, value) => setTagsArray(value) }
        getOptionLabel={(tag) => tag.title}
        filterSelectedOptions
        value={tagsArray}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Tags"
            placeholder="Type"
          />
        )}
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


export default CreateEvent;