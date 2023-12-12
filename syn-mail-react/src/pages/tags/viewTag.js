import React,{useState,useEffect} from "react";
import ResponsiveDrawer from "../dashboard";
import axios  from "axios";
import Table from "./DataTable";
import { useNavigate } from "react-router-dom";
const ViewTag = () => {

  
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true);
    const [data, setData] = React.useState('')
    const clickhandler = id => navigate('/admin/tags/view/'+id);



    const fetchTags = async (start = 0, end = 100) => {
      const response = await axios.get(process.env.REACT_APP_API_URL+'tags/view', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'bearer '+localStorage.getItem('token')
        }
    });
      setData(response.data);
      setLoading(false);
    };

  
    useEffect(() => {
        fetchTags();
    }, []);

    
    return <>
     <ResponsiveDrawer>
        <h1 style={{ fontWeight:"bold",textTransform:"uppercase" }} >View Tags</h1>

{loading ? <>Loading</> : <Table data={data} click={clickhandler}  /> }      
  

     </ResponsiveDrawer>
    </>
}

export default ViewTag;