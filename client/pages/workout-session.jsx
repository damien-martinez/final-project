import React from 'react';
import Workout from './workout';
import ModalButton from './modal-button';
import Timer from './timer';
import FinishButton from './finish-button';

export default class WorkoutSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: [],
      sessionDuration: 0
    };

    this.addWorkout = this.addWorkout.bind(this);
    this.handleWorkoutUpdated = this.handleWorkoutUpdated.bind(this);
    this.addSessionDuration = this.addSessionDuration.bind(this);
    this.postRequest = this.postRequest.bind(this);

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

  addSessionDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    this.setState({ sessionDuration: minutes });

  }

  postRequest(name) {
    const { workouts, sessionDuration } = this.state;
    if (this.state.workouts.length < 1) {
      return;
    }
    const submitData = {

      session: {
        name: name,
        durationInMinutes: sessionDuration,
        userId: 1
      },
      sessionWorkouts: []

    };
    let counter = 0;
    for (let i = 0; i < workouts.length; i++) {
      for (let j = 0; j < workouts[i].sets.length; j++) {
        submitData.sessionWorkouts.push(workouts[i].sets[j]);
        submitData.sessionWorkouts[counter].set = j + 1;
        if (submitData.sessionWorkouts[counter].reps < 0 || submitData.sessionWorkouts[counter].weight < 0) {
          window.alert('Cannot have values that are negative. Please fix and try again.');
          return;
        }

        if (submitData.sessionWorkouts[counter].reps === '' ||
           submitData.sessionWorkouts[counter].weight === '') {
          window.alert('Cannot have values that are blank. Please add numerical values.');
          return;
        }

        counter++;

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

  }

  render() {

    return (
    <>
      <div className='container-fluid'>
        <div className='row justify-content-between mt-3'>
          <div className='mt-4 col-6'>
            <h1>Workout Session</h1>
          </div>

            <div className='col-6'>

              <Timer addSessionDuration={this.addSessionDuration} />
              <div className='d-flex justify-content-end'>
                  <FinishButton postRequest={this.postRequest} />
                  <button type='button' className='btn btn-primary btn-md ms-4'>Cancel</button>
              </div>
          </div>
        </div>
          {
            this.state.workouts.map((workout, index) => (
              <Workout key={index} index={index} workout={workout} onWorkoutUpdated={this.handleWorkoutUpdated} />
            ))
          }
          <ModalButton onSelection={this.addWorkout} />
      </div>
    </>

    );

  }
}
