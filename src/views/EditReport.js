import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { findAllPatients, findAllLaboratorians, getReportById, editReport } from '../api/api';


export default function EditReport() {
  const { fileNo } = useParams();
  const navigate = useNavigate();
  const [laboratorians, setLaboratorians] = useState([]);
  const [selectedLabId, setSelectedLabId] = useState('');
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');

  const [report, setReport] = useState({
    diagnosisTitle: '',
    diagnosis: '',
    labIdNo: null,
    patientId: null,
  });

  //useEffects

  useEffect(() => {
    findAllPatients()
      .then(data => setPatients(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    findAllLaboratorians()
      .then(data => setLaboratorians(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getReportById(fileNo);
        setReport({
          diagnosisTitle: data.diagnosisTitle,
          diagnosis: data.diagnosis,
          labIdNo: data.labIdNo,
          patientId: data.patientId,
        });
        setSelectedLabId(data.labIdNo);
        setSelectedPatientId(data.patientId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReport();
  }, [fileNo]);


  //Functions
  const handlePatientSelect = (event) => {
    setSelectedPatientId(event.target.value);
    setReport({ ...report, patientId: event.target.value });
  };

  const handleLabSelect = (event) => {
    setSelectedLabId(event.target.value);
    setReport({ ...report, labIdNo: event.target.value });
  };

  const handleInputChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editReport(fileNo, report);
    navigate('/');
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2>Rapor Düzenle</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tanı Başlığı</label>
              <input
                type="text"
                className="form-control"
                placeholder="Tanı Başlığı"
                name="diagnosisTitle"
                value={report.diagnosisTitle}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Tanı</label>
              <input
                type='text'
                className='form-control'
                placeholder='Tanı açıklaması'
                name='diagnosis'
                value={report.diagnosis}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-3'>
              <label className='form-label mx-2'>Laborant:</label>
              <select
                id='laboratorian-select'
                onChange={handleLabSelect}
                value={selectedLabId}
              >
                <option value=''>Bir laborant seçin</option>
                {laboratorians.map((laboratorian) => (
                  <option
                    key={laboratorian.labIdNo}
                    value={laboratorian.labIdNo}
                  >
                    {laboratorian.name} {laboratorian.surname} ({laboratorian.labIdNo})
                  </option>
                ))}
              </select>

            </div>

            <div className='mb-3'>
              <label className='form-label mx-2'>Hasta : </label>
              <select
                id='patient-select'
                onChange={handlePatientSelect}
                value={selectedPatientId}
              >
                <option value=''>Bir hasta seçin</option>
                {patients.map((patient) => (
                  <option key={patient.patientId} value={patient.patientId}>
                    {patient.name} {patient.surname} ({patient.patientId})
                  </option>
                ))}
              </select>

            </div>
            <button type='submit' className='btn btn-outline-success'>
              Kaydet
            </button>
            <Link to='/' className='btn btn-outline-danger mx-2'>
              Geri dön
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
