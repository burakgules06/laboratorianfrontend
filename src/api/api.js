import axios from 'axios';
const API_URL = 'http://localhost:8080';

export const addNewPatient = async (patient) => {
  const response = await axios.post(`${API_URL}/patient/new`, patient);
  return response.data;
};

export const addNewPersonal = async (personal) => {
  const response = await axios.post(`${API_URL}/labpersonal/new`, personal);
  return response.data;
};


export const findAllPatients = async () => {
  const response = await axios.get(`${API_URL}/patient/findAll`);
  return response.data;
};

export const findAllLaboratorians = async () => {
  const response = await axios.get(`${API_URL}/labpersonal/findAll`);
  return response.data;
};

export const createReport = async (formData) => {
  await axios.post(`${API_URL}/report/new`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getReportById = async (fileNo) => {
  try {
    const response = await axios.get(`http://localhost:8080/report/findById/${fileNo}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editReport = async (fileNo, report) => {
  try {
    const response = await axios.put(`http://localhost:8080/report/edit/${fileNo}`, report);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getReportDetails = async (fileNo, setReport) => {
  try {
    const response = await axios.get(`http://localhost:8080/report/findById/${fileNo}`);
    setReport(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const getLabDetails = async (labIdNo, setReport) => {
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
};

export const getPatientDetails = async (patientId, setReport) => {
  try {
    const response = await axios.get(`http://localhost:8080/patient/findById/${patientId}`);
    setReport(report => ({
      ...report,
      patientName: response.data.name,
      patientSurname: response.data.surname
    }))
  } catch (error) {
    console.log(error);
  }
};

export const downloadAttachment = (attachmentId) => {
  const downloadUrl = `http://localhost:8080/download/${attachmentId}`;
  axios({
    url: downloadUrl,
    method: 'GET',
    responseType: 'blob',
    headers: {
      ' Access-Control-Allow-Origin': 'http://localhost:3000'
    }
  }).then(
    (response) => {
      const href = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', 'report.png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    }
  )
    .catch(error => console.error(error + 'cant download'));
  console.log(downloadUrl)
}