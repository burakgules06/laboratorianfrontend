  import axios from 'axios';
  import React, { useEffect, useState } from 'react';
  import { Link, useNavigate } from 'react-router-dom';

  export default function AddReport() {
    const [laboratorians, setLaboratorians] = useState([]);
    const [selectedLabId, setSelectedLabId] = useState("");

    const [patients, setPatients] = useState([]);
    const [selectedPatientId, setSelectedPatientId] = useState("");

    useEffect(() => {
      axios.get('http://localhost:8080/patient/findAll')
        .then(response => setPatients(response.data))
        .catch(error => console.log(error));
    }, []);

    useEffect(() => {
      axios.get('http://localhost:8080/labpersonal/findAll')
        .then(response => setLaboratorians(response.data))
        .catch(error => console.log(error));
    }, []);

    const [report, setReport] = useState({
      diagnosisTitle: '',
      diagnosis: '',
      labIdNo: null,
      patientId: null
    });

    const handlePatientSelect = (event) => {
      setSelectedPatientId(event.target.value);
      setReport({ ...report, patientId: event.target.value });
    };
    console.log(report.patientId)

    const handleLabSelect = (event) => {
      setSelectedLabId(event.target.value);
      setReport({ ...report, labIdNo: event.target.value });
    };
    console.log(report.labIdNo)

    const navigate = useNavigate();

    const { diagnosisTitle, diagnosis, labIdNo, patientId } = report;
    
    const handleInputChange = (e) => {
      setReport({ ...report, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {

      e.preventDefault();
      await axios.post('http://localhost:8080/report/new', report);
      navigate('/');
    };

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2>Rapor Ekle</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label className='form-label'>Tanı Başlığı</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Tanı Başlığı'
                  name='diagnosisTitle'
                  value={diagnosisTitle}
                  onChange={handleInputChange}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Tanı</label>
                <textarea
                  type='text'
                  className='form-control'
                  placeholder='Tanı açıklaması'
                  name='diagnosis'
                  value={diagnosis}
                  onChange={handleInputChange}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label mx-2'>Laborant:</label>
                <select id="laboratorian-select" onChange={handleLabSelect}>
                  <option value="">Bir laborant seçin</option>
                  {laboratorians.map(laboratorian => (
                    <option key={laboratorian.labIdNo} value={laboratorian.labIdNo}>
                      {laboratorian.name} {laboratorian.surname} ({laboratorian.labIdNo})
                    </option>
                  ))}
                </select>
              </div>

              <div className='mb-3'>
                <label className='form-label mx-2'>Hasta : </label>
                <select id="patient-select" onChange={handlePatientSelect}>
                  <option value="">Bir hasta seçin</option>
                  {patients.map(patient =>(
                    <option key = {patient.patientId} value={patient.patientId}>
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
