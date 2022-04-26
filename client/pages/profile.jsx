import React from 'react';

import BarChart from './bar-chart';

export default class Profile extends React.Component {

  render() {
    return (
    <>
      <div className='container-fluid'>
        <div className='row justify-content-between mt-3'>
          <div className='col-6'>
            <h1 className='display-3'>Profile</h1>
          </div>
          <div className='col-6'>
            <div className='d-flex no-wrap justify-content-end'>
            </div>
            <div className='d-flex justify-content-end'>
              <a href='#' type='button' className='btn btn-primary btn-md ms-4'>Homepage</a>
            </div>
          </div>
        </div>
        <div className='row h-50'>
            <BarChart height={'2%'} width={'2%'}
              options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </>
    );
  }
}
