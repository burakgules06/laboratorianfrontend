import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    if (sorted) {
      loadSortedReports();
    } else {
      loadReports();
    }
  }, [searchTerm, sorted]);

  //functions

  const loadReports = async () => {
    try {
      const response = await axios.get("http://localhost:8080/report/search", { params: { keyword: searchTerm } });
      setReports(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const loadSortedReports = async () => {
    try {
      const response = await axios.get("http://localhost:8080/report/findAll/sorted");
      setReports(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReport = async (fileNo) => {
    try {
      await axios.delete(`http://localhost:8080/report/delete/${fileNo}`);
      if (sorted) {
        loadSortedReports();
      } else {
        loadReports();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = () => {
    setSorted(!sorted);
  };

  return (
    <div className='container'>
      <div className='py-4'>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Ara" value={searchTerm} onChange={handleSearch} />
          <button className="btn btn-outline-secondary" type="button" onClick={handleSort}>
            {sorted ? "Eski Haline Dön" : "Tarihe Göre Sırala"}
          </button>
        </div>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Dosya Numarası</th>
              <th scope="col">Tanı Başlığı</th>
              <th scope="col">Rapor Tarihi</th>
              <th scope="col">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{report.fileNo}</td>
                <td>{report.diagnosisTitle}</td>
                <td>{new Date(report.date).toLocaleDateString()}</td>
                <td>
                  <Link to={`/editreport/${report.fileNo}`} className='btn btn-primary mx-2'>
                    Düzenle
                  </Link>
                  <Link to={`/reportdetails/${report.fileNo}`} className='btn btn-secondary mx-2'>
                    Detaylar
                  </Link>
                  <button className='btn btn-danger mx-2' onClick={() => deleteReport(report.fileNo)}>
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
