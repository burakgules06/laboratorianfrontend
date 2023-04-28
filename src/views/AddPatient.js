import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addNewPatient } from '../api/api';

export default function AddPatient() {
    const navigate = useNavigate();
    const [patient, setPatient] = useState({
        name: '',
        surname: '',
        tcNo: ''
    });

    const { name, surname, tcNo } = patient;

    const handleInputChange = (e) => {
        setPatient({ ...patient, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addNewPatient(patient);
        navigate('/');
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2>Hasta Kaydı</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label className='form-label'>Ad</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Ad Giriniz.'
                                name='name'
                                value={name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Soyad</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Soyad Giriniz.'
                                name='surname'
                                value={surname}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Hasta T.C No:</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='11111111111'
                                name='tcNo'
                                value={tcNo}
                                onChange={handleInputChange}
                            />
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
