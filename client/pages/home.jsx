import React from 'react';

export default function Home(props) {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <h4 className='display-2 text-secondary'>Get Yolked!</h4>
      </div>
      <div className='d-flex flex-nowrap fixed-bottom'>
        <nav className="navbar-nav navbar-dark bg-primary flex-nowrap flex-row col-6 me-1 p-1">
          <div className="container-fluid d-flex justify-content-center align-items-center nav-item">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a href="#profile" className='text-decoration-none'>
                  <i className="bi bi-person-fill text-white fs-3 d-flex justify-content-center mt-1"></i>
                </a>
                <a href="#profile" className="navbar-brand mx-auto nav-link text-white">Profile</a>
              </li>
              </ul>
          </div>
        </nav>
        <nav className="navbar-nav navbar-dark bg-primary flex-nowrap flex-row col-6 ms-1 p-1">
          <div className="container-fluid d-flex justify-content-center align-items-center nav-item">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a href="#workout-session" className='text-decoration-none'>
                  <i className="bi bi-egg-fried text-white fs-3 d-flex justify-content-center mt-1"></i>
                </a>
                <a href="#workout-session" className="navbar-brand mx-auto nav-link text-white">Start Workout</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

    </>
  );
}
