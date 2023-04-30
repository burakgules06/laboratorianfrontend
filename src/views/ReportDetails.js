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

    <div className='container text-center'>
      <table class="table table-striped-columns">
        <thead>
          <tr>
            <th scope="col">Rapor Dosya Numarası</th>
            <th scope="col">Tarih:</th>
            <th scope="col">Laborant:</th>
            <th scope="col">Hasta:</th>
            <th scope="col">Tanı Başlığı:</th>
            <th scope="col">Tanı:</th>
            <th scope="col">Rapor Fotoğrafı</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{report.fileNo}</th>
            <td>{report.date}</td>
            <td>{report.labName} {report.labSurname}</td>
            <td>{report.patientName} {report.patientSurname}</td>
            <td>{report.diagnosisTitle}</td>
            <td>{report.diagnosis}</td>
            <td>
              <button
                type='submit'
                className='btn btn-outline-success'
                onClick={() => downloadAttachment(report.attachmentId)}> İndir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Link to='/' className='btn btn-outline-danger mx-2' >Geri dön</Link></div>
  );
}

export default ReportDetails;