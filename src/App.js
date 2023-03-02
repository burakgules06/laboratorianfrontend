import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import AddLabPersonal from './component/AddLabPersonal';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddReport from './component/AddReport';
import AddPatient from './component/AddPatient';
import EditReport from './component/EditReport';
import ReportDetails from './component/ReportDetails';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/addlabpersonal' element={<AddLabPersonal />} />
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
