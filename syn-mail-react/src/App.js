import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import CreateTag from './pages/tags/createTag';
import ViewTag from './pages/tags/viewTag';
import CreateEvent from './pages/events/createEvent';
import ViewEvents from './pages/events/viewEvents';
import EditTag from './pages/tags/editTag';
import EditEvent from './pages/events/editEvent';
import ViewRegistrationList from './pages/events/registrations/viewRegistrationList';
import ViewBatch from './pages/batches/viewBatch';
import ViewRegistrations from './pages/registrations/viewRegistrations';
import SendSms from './pages/sms/SendSms';
import WhatsApp from './pages/whatsapp/WhatsApp';
import ViewConferences from './pages/bigmarker/viewConferences';

function App() {
  return ( <>
  {/* <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/dashboard">Dashboard</Link></li>
  </ul> */}
  <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='/dashboard' element={<Dashboard/>} />
    <Route path='/admin/tags' element={<Dashboard/>} />
    <Route path='/admin/tags/create' element={<CreateTag/>} />
    <Route path='/admin/tags/view/' element={<ViewTag/>} />
    <Route path='/admin/tags/view/:id' element={<EditTag/>} />
    <Route path='/admin/events/create' element={<CreateEvent/>} />
    <Route path='/admin/events/view/' element={<ViewEvents/>} />
    <Route path='/admin/events/edit/:id' element={<EditEvent/>} />
    <Route path='/admin/events/registration/:id' element={<ViewRegistrationList/>} />
    <Route path='/admin/importjobs' element={<ViewBatch/>} />
    <Route path='/admin/registrations' element={<ViewRegistrations/>} />
    <Route path='/admin/send-sms' element={<SendSms />} />
    <Route path='/admin/whatsapp' element={<WhatsApp />} />
    <Route path='/admin/bigmarker/conferences' element={<ViewConferences />} />


  </Routes>
  </>
  );
}

export default App;
