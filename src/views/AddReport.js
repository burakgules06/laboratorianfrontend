import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { findAllPatients, findAllLaboratorians, createReport } from '../api/api';

export default function AddReport() {

  //UseState
  const [laboratorians, setLaboratorians] = useState([]);
  const [, setSelectedLabId] = useState("");
  const [reportImage, setreportImage] = useState("");
  const [patients, setPatients] = useState([]);
  const [, setSelectedPatientId] = useState("");

  const [report, setReport] = useState({
    diagnosisTitle: '',
    diagnosis: '',
    labIdNo: null,
    patientId: null,
    reportImage: null
  });

  //useEffect
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

  //functions
  const handleImage = (e) => {
    const file = e.target.files[0]
    setreportImage(file)
    console.log('handle image result' + file)
  };

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
    const formData = new FormData();
    formData.append('diagnosisTitle', diagnosisTitle);
    formData.append('diagnosis', diagnosis);
    formData.append('labIdNo', labIdNo);
    formData.append('patientId', patientId);
    formData.append('file', reportImage);
    await createReport(formData);
    navigate('/');
  };

  const navigate = useNavigate();
  const { diagnosisTitle, diagnosis, labIdNo, patientId } = report;
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
            <div>
              <input type='file' name='file' accept='.jpg,.jpeg,.png' onChange={handleImage} />
            </div>
            <br></br>
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
                {patients.map(patient => (
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