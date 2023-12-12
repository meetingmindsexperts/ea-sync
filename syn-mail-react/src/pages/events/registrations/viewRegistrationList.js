import React,{useState,useEffect} from "react";
import ResponsiveDrawer from "../../dashboard";
import axios  from "axios";
import Table from "./../DataTable";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { toast } from 'react-toastify';

const ViewRegistrationList = () => {

    const {id} = useParams();

    const navigate = useNavigate();
    const [loading,setLoading] = useState(true);
    const [data, setData] = React.useState('')
    const clickhandler = id => navigate('/admin/events/edit/'+id);

    const fetchEvents = async (start = 0, end = 100) => {
      const response = await axios.get(process.env.REACT_APP_API_URL+'eventsair/view/'+id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'bearer '+localStorage.getItem('token')
        }
    });

    setData(response.data);
      setLoading(false);
    };
const synWithEa = async () => {
  const response = await axios.get(process.env.REACT_APP_API_URL+'eventsair/sync/'+id, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'bearer '+localStorage.getItem('token')
    }
});


if(response.data.type == 'error'){
  toast.error(response.data.message, {
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
toast.success(response.data.count+" Registrations Imported Successfully", {
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


const synWithMailChimp = async () => {
  const response = await axios.get(process.env.REACT_APP_API_URL+'eventsair/sync/mailchimp/'+id, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'bearer '+localStorage.getItem('token')
    }
});

toast.success(response.data.count+" Registrations Imported Successfully", {
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

  
    useEffect(() => {
      fetchEvents();
    }, []);

    
    return <>
     <ResponsiveDrawer>
        <h1 style={{ fontWeight:"bold",textTransform:"uppercase" }} >View Event Registrations</h1>
        <p>
          {console.log(data.tags)}
          <b>Event Name:</b> {data.title}
          <br/>
          <b>Event Tags:</b> {data.tags ? data.tags.map((e) => {
         return e.title+", ";
    }): <></> }
        </p>
        <Button variant="contained" onClick={synWithEa}>Syn With EA</Button>
        <Button variant="contained" style={{ marginLeft:'10px' }} onClick={synWithMailChimp}>Syn With MailChimp</Button>

          {/* {loading ? <>Loading</> : <Table data={data} click={clickhandler}  /> }       */}
  

     </ResponsiveDrawer>
    </>
}

export default ViewRegistrationList;