// import React, { useState, useEffect } from "react";
// import ResponsiveDrawer from "../dashboard";
// import axios from "axios";
// import Table from "./DataTable";
// import { useNavigate } from "react-router-dom";
// import { Grid } from "@mui/material";
// import { TextField, Button } from "@mui/material";
// import Autocomplete from "@mui/material/Autocomplete";
// import SearchIcon from "@mui/icons-material/Search";
// import { LockReset } from "@mui/icons-material";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ViewConferences = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = React.useState("");
//   const [tags, setTags] = React.useState("");
//   const [events, setEvents] = React.useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [position, setPosition] = useState("");
//   const [country, setCountry] = useState("");
//   const [organization, setOrganization] = useState("");
//   const [tagsArray, setTagsArray] = React.useState([]);
//   const [eventsArray, setEventsArray] = React.useState([]);

//   const clickhandler = (id) => navigate("/admin/bigmarker/conferences/" + id);

//   const fetchTags = async () => {
//     const response = await axios.get(process.env.REACT_APP_API_URL + "conferences", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "bearer " + localStorage.getItem("token"),
//       },
//     });
//     setTags(response.data);
//     if (response.data.length > 0) {
//       setData(response.data);
//       // setLoading(false);
//     } else {
//       // setLoading(true);
//     }
//   };

//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get(process.env.REACT_APP_API_URL + "eventsair/view", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "bearer " + localStorage.getItem("token"),
//         },
//       });
//       setEvents(response.data);
//       console.log(response.data);
//       // setLoading(false);
//     } catch (error) {
//       console.error("Error fetching events from BigMarker:", error.message);
//       toast.error("Error fetching events from BigMarker", {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchTags();
//     fetchEvents();
//   }, []);

//   // ... (rest of your code remains unchanged)

//   return (
//     <>
//       <ResponsiveDrawer>
//         {/* ... (existing code) */}
//       </ResponsiveDrawer>
//     </>
//   );
// };

// export default ViewConferences;
