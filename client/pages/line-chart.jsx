import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import format from 'date-fns/format';

export default class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutList: [],
      selectedOption: '',
      exerciseData: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getBestExercise = this.getBestExercise.bind(this);
    this.organizeMaxData = this.organizeMaxData.bind(this);
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

  handleSubmit(e) {
    if (this.state.selectedOption === '') {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    fetch(`/api/get-exercise/${this.state.selectedOption}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert('There is no recorded data for this exercise yet. Try incorporating this exercise into your next workout session!');
          this.setState({ selectedOption: '' });
        } else {
          this.getBestExercise(data);
        }

      });

  }

  getBestExercise(data) {

    const sessions = {};
    const maxSessions = {};
    for (let i = 0; i < data.length; i++) {
      sessions[String(data[i].sessionId)] = [];
      maxSessions[String(data[i].sessionId)] = {};
    }
    for (const props in sessions) {
      for (let i = 0; i < data.length; i++) {
        if (String(data[i].sessionId) === props) {
          sessions[props].push(data[i]);
        }
      }
    }

    for (const props in sessions) {
      let max = 0;
      for (let i = 0; i < sessions[props].length; i++) {
        if (sessions[props][i].reps >= 5 && sessions[props][i].weight > max) {
          max = sessions[props][i].weight;
          maxSessions[props] = sessions[props][i];
        }
      }
    }

    this.organizeMaxData(maxSessions);

  }

  organizeMaxData(maxData) {
    const dataLabels = [];
    const weightsData = [];
    let prop = null;

    for (const props in maxData) {
      const formattedDate = format(new Date(maxData[props].createdAt), 'MM/dd');
      dataLabels.push(formattedDate);
      weightsData.push(maxData[props].weight);
      prop = props;
    }

    const chosenWorkout = this.state.workoutList.find(workout => {
      return workout.workoutId === maxData[prop].workoutId;
    });

    const dataWithName = {
      data: {
        labels: dataLabels,
        datasets: [
          {
            data: weightsData,
            borderColor: '#7782ba',
            backgroundColor: '#39327c'
          }
        ]
      },
      name: chosenWorkout.name
    };

    this.setState({
      exerciseData: this.state.exerciseData.concat(dataWithName),
      selectedOption: ''
    });

  }

  handleChange(e) {
    this.setState({ selectedOption: e.target.value });

  }

  render() {

    return (
      <>
      <div className='row m-3'>
        <h4 className='mt-4'>Track Your Personal Records</h4>

        <>
          <form id="exercise-picker" onSubmit={this.handleSubmit}>
            <select className="form-select" role={'button'} aria-label="Default select example" value={this.state.selectedOption} onChange={this.handleChange} >
              <option disabled value="">Open this select menu</option>
                {
                  this.state.workoutList.map(workout => (
                    <option key={workout.workoutId} value={workout.workoutId}>{workout.name}</option>
                  ))
                }
            </select>
            <div className='d-flex justify-content-end mt-3'>
              <button form="exercise-picker" variant="primary" type="submit" className='btn btn-primary btn-md ms-4'>Add Workout</button>
            </div>
          </form>
        </>
      </div>

      { this.state.exerciseData.map((exerciseDatum, index) =>
        (
          <div key={index} className='row m-4'>
            <h5>{exerciseDatum.name}</h5>
            <Line key={index} data={exerciseDatum.data}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              ticks: { precision: 0 },
              plugins: { legend: { display: false } }
            }}/>
          </div>
        ))
      }

        </>
    );
  }
}
