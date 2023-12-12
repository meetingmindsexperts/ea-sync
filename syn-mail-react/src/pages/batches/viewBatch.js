import React,{useState,useEffect} from "react";
import ResponsiveDrawer from "../dashboard";
import axios  from "axios";
import Table from "./DataTable";
import { useNavigate } from "react-router-dom";
const ViewBatch = () => {

  
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true);
    const [data, setData] = React.useState('')
    const clickhandler = id => navigate('/admin/tags/view/'+id);



    const fetchBatches = async (start = 0, end = 100) => {
      const response = await axios.get(process.env.REACT_APP_API_URL+'batches/view', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'bearer '+localStorage.getItem('token')
        }
    });
      setData(response.data);
      // console.log(response.data);
      setLoading(false);
    };

   
    useEffect(() => {
      fetchBatches();
    }, []);

    
    return <>
     <ResponsiveDrawer>
        <h1 style={{ fontWeight:"bold",textTransform:"uppercase" }} >View Import Jobs</h1>

{loading ? <>Loading</> : <Table data={data} click={clickhandler}  /> }      
  

     </ResponsiveDrawer>
    </>
}

export default ViewBatch;