import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddPersonal from './views/AddPersonal';
import AddReport from './views/AddReport';
import AddPatient from './views/AddPatient';
import EditReport from './views/EditReport';
import ReportDetails from './views/ReportDetails';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/addlabpersonal' element={<AddPersonal />} />
          <Route path='/addreport' element={<AddReport />} />
          <Route path='/addpatient' element={<AddPatient />} />
          <Route path='/editreport/:fileNo' element={<EditReport />} />
          <Route path='/reportdetails/:fileNo' element={<ReportDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
