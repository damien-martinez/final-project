import React from 'react';
import Workout from './workout';
import ModalButton from './modal-button';
import FinishButton from './finish-button';

export default class WorkoutSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: [],

      seconds: 0,
      timerOn: true,
      timerId: null
    };

    this.addWorkout = this.addWorkout.bind(this);
    this.handleWorkoutUpdated = this.handleWorkoutUpdated.bind(this);

    this.postRequest = this.postRequest.bind(this);
    this.click = this.click.bind(this);
    this.renderPlayOrPause = this.renderPlayOrPause.bind(this);
    this.clickCancel = this.clickCancel.bind(this);
    this.removeExercise = this.removeExercise.bind(this);

  }

  componentDidMount() {
    const mountTimerId = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });

    }, 1000);

    this.setState({ timerId: mountTimerId });

  }

  addWorkout(exercise) {
    const workout = {
      exercise: exercise,
      sets: [{
        workoutId: exercise.workoutId,
        weight: '0',
        reps: '0'
      }]
    };
    this.setState({
      workouts: this.state.workouts.concat(workout)
    });
  }

  handleWorkoutUpdated(index, workoutData) {
    const updatedWorkouts = this.state.workouts.slice();
    updatedWorkouts[index] = workoutData;
    this.setState({ workouts: updatedWorkouts });
  }

  postRequest(name) {
    const { workouts, seconds } = this.state;
    if (this.state.workouts.length < 1) {
      return;
    }
    const submitData = {

      session: {
        name: name,
        durationInMinutes: Math.floor(seconds / 60),
        userId: 1
      },
      sessionWorkouts: []

    };
    let objectInArray = {};

    for (let i = 0; i < workouts.length; i++) {
      for (let j = 0; j < workouts[i].sets.length; j++) {
        objectInArray.reps = workouts[i].sets[j].reps;
        objectInArray.weight = workouts[i].sets[j].weight;
        objectInArray.workoutId = workouts[i].sets[j].workoutId;
        if (parseInt(objectInArray.reps) < 0 || parseInt(objectInArray.weight) < 0) {
          window.alert('Cannot have values that are negative. Please fix and try again.');
          return;
        }

        if (objectInArray.reps === '' ||
          objectInArray.weight === '') {
          window.alert('Cannot have values that are blank. Please add numerical values.');
          return;
        }
        submitData.sessionWorkouts.push(objectInArray);

        objectInArray = {};
      }
    }

    fetch('api/add-session-and-session-workout-data',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      })
      .then(res => {
        res.json();

      });

    this.setState({ workouts: [] });
    clearInterval(this.state.timerId);
    this.setState({ timerOn: !this.state.timerOn });
    this.setState({ seconds: 0 });
    window.location.hash = '#';

  }

  click() {

    if (this.state.timerOn) {
      clearInterval(this.state.timerId);
      this.setState({ timerOn: !this.state.timerOn });
    } else {

      const mountTimerId = setInterval(() => {
        this.setState({ seconds: this.state.seconds + 1 });

      }, 1000);

      this.setState({ timerId: mountTimerId });
      this.setState({ timerOn: !this.state.timerOn });

    }

  }

  renderPlayOrPause() {
    if (this.state.timerOn) {
      return (
        <i onClick={this.click} className="bi bi-pause-circle me-5 h1"></i>
      );
    } else {
      return (
        <i onClick={this.click} className="bi bi-play-circle me-5 h1"></i>
      );
    }
  }

  clickCancel() {
    this.setState({ workouts: [] });
    clearInterval(this.state.timerId);
    this.setState({ timerOn: !this.state.timerOn });
    this.setState({ seconds: 0 });
  }

  removeExercise(index) {

    const workoutsCopy = this.state.workouts.slice();
    workoutsCopy.splice(index, 1);
    this.setState({ workouts: workoutsCopy });

  }

  render() {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    hours = Math.floor(this.state.seconds / 60 / 60);
    seconds = 60 * hours * 60;
    seconds = this.state.seconds - seconds;
    minutes = Math.floor(seconds / 60);
    seconds = (60 * minutes) + (60 * 60 * hours);
    let leftOverSeconds = this.state.seconds - seconds;
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (leftOverSeconds < 10) {
      leftOverSeconds = `0${leftOverSeconds}`;
    }

    return (
    <>
      <div className='container-fluid'>
        <div className='row justify-content-between mt-3'>
          <div className='mt-4 col-6'>
            <h1 className='display-3'>Workout Session</h1>
          </div>

            <div className='col-6'>

              <div className='d-flex no-wrap justify-content-end'>
                {this.renderPlayOrPause()}
                <p className='text-end'>{`${hours}:${minutes}:${leftOverSeconds}`}</p>
              </div>
              <div className='d-flex justify-content-end'>
                  <FinishButton postRequest={this.postRequest} />
                  <a href='#' onClick={this.clickCancel} type='button' className='btn btn-primary btn-md ms-4'>Cancel</a>
              </div>
          </div>
        </div>
          {
            this.state.workouts.map((workout, index) => (
              <Workout key={index} index={index} workout={workout} removeExercise={this.removeExercise} onWorkoutUpdated={this.handleWorkoutUpdated} />
            ))
          }
          <ModalButton onSelection={this.addWorkout} />
      </div>
    </>

    );

  }
}
