import React,{useState,useEffect} from "react";
import ResponsiveDrawer from "../dashboard";
import axios  from "axios";
import Table from "./DataTable";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { TextField,Button } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { LockReset } from "@mui/icons-material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SendSms = () => {

  const navigate = useNavigate();
  const [loading,setLoading] = useState(true);
  const [data, setData] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [events, setEvents] = React.useState('');
  const [mobileNumbers,setMobileNumbers] = useState("");
  const [position,setPosition] = useState("");
  const [message,setMessage] = useState("");
  const [country,setCountry] = useState("");
  const [organization,setOrganization] = useState("");
  const [tagsArray, setTagsArray] = React.useState([]);
  const [eventsArray, setEventsArray] = React.useState([]);



  const fetchTags = async (start = 0, end = 100) => {
    const response = await axios.get(process.env.REACT_APP_API_URL+'tags/view', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'bearer '+localStorage.getItem('token')
      }
  });
  setTags(response.data);
  if(response.data.length > 0){
    setData(response.data);
    // setLoading(false);
  } else {
    // setLoading(true);
  }
  };

  const fetchEvents = async (start = 0, end = 100) => {
    const response = await axios.get(process.env.REACT_APP_API_URL+'eventsair/view', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'bearer '+localStorage.getItem('token')
      }
  });
  setEvents(response.data);

    // setLoading(false);
  };


  useEffect(() => {
      fetchTags();
      fetchEvents();
  }, []);

  const handleReset = () => {

    setOrganization('');
    setCountry('');
    setPosition('');
    setTagsArray([]);
    setEventsArray([]);
    setLoading(true);
  }

  const submitHandler = () => {
  
    var tagsResult = [];
      tagsArray.map(function (e) {
      return tagsResult.push(e.id);
  
    });

    var eventsResult = [];

      eventsArray.map(function (e) {
      return eventsResult.push(e._id);
  
    });

    axios.post(process.env.REACT_APP_API_URL+'registration/get-numbers', {
     organization: organization,
     position: position,
     country: country,
     events:eventsResult,
     tags:tagsResult
   },
  {
   headers: {
     'Content-Type': 'application/json',
     'Authorization' : 'bearer '+localStorage.getItem('token')
   }
  })
   .then(function (response) {
    
    // console.log(response);
    setData(response.data);
    if(response.data.length > 0){
      setLoading(false);
      let numbers = response.data.map((user,i) => { return user.mobile_number });
      setMobileNumbers(numbers);

    } else {
      setLoading(true);
      toast.error('No Record Found', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
      //  setTagsArray([]);
   })
   .catch(function (error) {
     toast.error('Please select any field to search', {
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
 
  
 const sendMessageSubmitHandler = () => {
  
  if(message == '' ){
        toast.error('Message is required', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  if(mobileNumbers == '' ){
    toast.error('Mobile numbers are required', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  });
}

  axios.post(process.env.REACT_APP_API_URL+'registration/send-sms', {
    numbers: mobileNumbers,
    message: message,
  },
 {
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : 'bearer '+localStorage.getItem('token')
  }
 })
 .then(function (response) {
  
  // console.log(response);
  setData(response.data);
console.log(response)
    // setLoading(false);
    // toast.error('Message Sent Successfully', {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    //   });

    //  setTagsArray([]);
 })
 .catch(function (error) {
   toast.error('Please select any field to search', {
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


  return <>
   <ResponsiveDrawer>
      <h1 style={{ fontWeight:"bold",textTransform:"uppercase" }} >Send SMS</h1>

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

          <Grid item xs={2} sm={4} md={4}>
          <TextField
      style={{ width: "100%", margin: "5px" }}
      type="text"
      label="Enter Organization"
      variant="outlined"
      value={organization}
      onChange={(e)=>{setOrganization(e.target.value); }}
    />
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
          <TextField
      style={{ width: "100%", margin: "5px" }}
      type="text"
      label="Enter Position"
      variant="outlined"
      value={position}
      onChange={(e)=>{setPosition(e.target.value); }}
    />
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
          <TextField
      style={{ width: "100%", margin: "5px" }}
      type="text"
      label="Enter Country"
      variant="outlined"
      value={country}
      onChange={(e)=>{setCountry(e.target.value); }}
    />
          </Grid>

      </Grid>
      <Grid container style={{ paddingTop:'25px' }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 8 }}>
      
            <Grid item xs={2} sm={4} md={4}>
    
    <Autocomplete
    multiple
    style={{ width: "100%", margin: "5px" }}
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

    </Grid>

    <Grid item xs={2} sm={4} md={4}>
    
    <Autocomplete
    multiple
    style={{ width: "100%", margin: "5px" }}
    id="tags-outlined"
    options={events}
    onChange={(event, value) => setEventsArray(value) }
    getOptionLabel={(event) => event.title}
    filterSelectedOptions
    value={eventsArray}
    renderInput={(params) => (
    <TextField
    {...params}
    label="Select Events"
    placeholder="Type"
    />
    )}
    />

    </Grid>

</Grid>

    <Button style={{ marginLeft:'5px',marginTop:'20px',width:'10%' }}
      startIcon={<SearchIcon />}
      variant="contained"
      onClick={submitHandler}
    >
      Search
    </Button>

    <Button style={{ marginLeft:'5px',marginTop:'20px',width:'10%' }}
      startIcon={<LockReset />}
      variant="contained"
      onClick={handleReset}
    >
      Reset
    </Button>

{loading ? <></> : <>

<h1 style={{ fontWeight:"bold",textTransform:"uppercase",paddingTop:20,paddingBottom:10 }} >Send SMS</h1>

<Grid container  spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>

<Grid item xs={12} sm={12} md={12}>

<TextField
      style={{ width: "100%", margin: "5px" }}
      type="text"
      label="Mobile Numbers"
      variant="outlined"
      value={mobileNumbers}
      multiline
      rows={6}
      onChange={(e)=>{setMobileNumbers(e.target.value); }}
    />
    </Grid>
<Grid item xs={12} sm={12} md={12}>
<TextField
      style={{ width: "100%", margin: "5px" }}
      type="text"
      label="Type Message"
      variant="outlined"
      value={message}
      multiline
      rows={6}
      onChange={(e)=>{setMessage(e.target.value); }}
    />
</Grid>
</Grid>
<Button style={{ marginLeft:'5px',marginTop:'20px',width:'18%' }}
      startIcon={<SearchIcon />}
      variant="contained"
      onClick={sendMessageSubmitHandler}
    >
      Send Message
    </Button>
</> }      


   </ResponsiveDrawer>
  </>
}

export default SendSms;