import { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';

function ReportDetails() {
  const { fileNo } = useParams();
  const [report, setReport] = useState({});

  useEffect(() => {
    loadReportDetails(fileNo);
  }, [fileNo]);

  useEffect(() => {
    if (report.labIdNo || report.patientId) {
      loadPatientDetails(report.patientId);
      loadLabDetails(report.labIdNo);
    }
  }, [report.labIdNo]);

  const loadReportDetails = async (fileNo) => {
    try {
      const response = await axios.get(`http://localhost:8080/report/findById/${fileNo}`);
      setReport(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const loadLabDetails = async (labIdNo) => {
    try {
      const response = await axios.get(`http://localhost:8080/labpersonal/findById/${labIdNo}`);
      setReport(report => ({
        ...report,
        labName: response.data.name,
        labSurname: response.data.surname
      }));
    } catch (error) {
      console.error(error);
    }
  }
  const loadPatientDetails = async (patientId) =>{
    try{
      const response = await axios.get(`http://localhost:8080/patient/findById/${patientId}`);
      setReport(report => ({
        ...report,
        patientName: response.data.name,
        patientSurname : response.data.surname
      }))
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Rapor Detayları</h1>
      <p><strong>Rapor Dosya Numarası:</strong> {report.fileNo}</p>
      <p><strong>Tarih:</strong> {report.date}</p>
      <p><strong>Laborant: </strong> {report.labName} {report.labSurname}</p>
      <p><strong>Hasta:</strong> {report.patientName} {report.patientSurname}</p>
      <p><strong>Tanı Başlığı:</strong> {report.diagnosisTitle}</p>
      <p><strong>Tanı:</strong> {report.diagnosis}</p>
      <Link to='/' className='btn btn-outline-danger mx-2'>
              Geri dön
            </Link>
    </div>
    
  );
}

export default ReportDetails;
