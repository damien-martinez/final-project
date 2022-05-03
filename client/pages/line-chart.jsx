import React from 'react';
// import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
// import format from 'date-fns/format';

export default class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutList: null,
      selectedOption: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('/api/get-workouts')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ workoutList: data });
      });
  }

  handleSubmit() {

  }

  handleChange() {

  }

  render() {

    return (
      <>
      <div className='row m-3'>
        <h4 className='mt-4'>Track Your Personal Records</h4>
        {this.state.workoutList !== null &&
        <>
        <form id="workout-picker" onSubmit={this.handleSubmit}>
          <select className="form-select" role={'button'} aria-label="Default select example" value={this.state.selectedOption} onChange={this.handleChange} >
            <option disabled value="">Open this select menu</option>
            {
              this.state.workoutList.map(workout => (
                <option key={workout.workoutId} value={workout.workoutId}>{workout.name}</option>
              ))
            }
          </select>
        </form>

        <div className='d-flex justify-content-end mt-3'>
              <a form="workout-picker" variant="primary" type="submit" className='btn btn-primary btn-md ms-4'>Add Workout</a>
        </div>
            </>}
        </div>
      </>
    );
  }
}
