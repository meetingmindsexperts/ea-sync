import React,{useState,useEffect} from "react";
import ResponsiveDrawer from "../dashboard";
import axios  from "axios";
import Table from "./DataTable";
import { useNavigate } from "react-router-dom";
const ViewEvents = () => {

  
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true);
    const [data, setData] = React.useState('')
    const clickhandler = id => navigate('/admin/events/edit/'+id);
    const registrationClickHandler = id => navigate('/admin/events/registration/'+id);


    const fetchEvents = async (start = 0, end = 100) => {
      const response = await axios.get(process.env.REACT_APP_API_URL+'eventsair/view', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'bearer '+localStorage.getItem('token')
        }
    });
      setData(response.data);
      console.log(response.data);
      setLoading(false);
    };

  
    useEffect(() => {
      fetchEvents();
    }, []);

    
    return <>
     <ResponsiveDrawer>
        <h1 style={{ fontWeight:"bold",textTransform:"uppercase" }} >View Events</h1>

          {loading ? <>Loading</> : <Table data={data} registration={registrationClickHandler} click={clickhandler}  /> }      
  

     </ResponsiveDrawer>
    </>
}

export default ViewEvents;