import React from 'react'
import { Link } from 'react-router-dom'

export default function navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand mx-2" href="/" >Laboratuvar Yönetim Paneli</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <Link className='btn btn-outline-light mx-2' to={'/addreport'}>Rapor Girişi</Link> 
        <Link className='btn btn-outline-light mx-2' to={'/addpatient'}>Hasta Kaydı</Link> 
        <Link className='btn btn-outline-light mx-2' to={'/addlabpersonal'}>Personel Kaydı</Link> 
        </nav>
    </div>
  )
}
