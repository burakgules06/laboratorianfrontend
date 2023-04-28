import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getReportDetails, getLabDetails, getPatientDetails, downloadAttachment } from '../api/api';

function ReportDetails() {
  const { fileNo } = useParams();
  const [report, setReport] = useState({});

  //Functions
  useEffect(() => {
    getReportDetails(fileNo, setReport);
  }, [fileNo, setReport]);

  useEffect(() => {
    if (report.labIdNo) {
      getLabDetails(report.labIdNo, setReport);
    }
    if (report.patientId) {
      getPatientDetails(report.patientId, setReport);
    }
  }, [report.labIdNo, report.patientId, setReport]);



  return (
    <div>
      <h1> Rapor Detayları </h1>
      <p><strong>Rapor Dosya Numarası: </strong> {report.fileNo}</p >
      <p><strong>Tarih: </strong> {report.date}</p >
      <p> <strong > Laborant: </strong> {report.labName} {report.labSurname}</p >
      <p> <strong>Hasta: </strong> {report.patientName} {report.patientSurname}</p >
      <p> <strong>Tanı Başlığı: </strong> {report.diagnosisTitle}</p >
      <p> <strong>Tanı: </strong> {report.diagnosis}</p >
      <p> Rapora ait fotoğrafı indirmek için tıklayın:
        <button type='submit' className='btn btn-outline-success' onClick={
          () => downloadAttachment(report.attachmentId)
        }> İndir
        </button>
      </p>
      <Link to='/' className='btn btn-outline-danger mx-2' >Geri dön</Link></div>
  );
}

export default ReportDetails;