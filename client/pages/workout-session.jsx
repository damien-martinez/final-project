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
      sessionName: '',
      sessionDuration: 0
    };

    this.addWorkout = this.addWorkout.bind(this);
    this.handleWorkoutUpdated = this.handleWorkoutUpdated.bind(this);
    this.addSessionName = this.addSessionName.bind(this);
    this.addSessionDuration = this.addSessionDuration.bind(this);
    this.postRequest = this.postRequest.bind(this);

  }

  addWorkout(exercise) {
    const workout = {
      exercise: exercise,
      sets: [{
        workoutId: exercise.workoutId,
        weight: 0,
        reps: 0
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

  addSessionName(name) {
    this.setState({ sessionName: name });
  }

  postRequest() {
    const { workouts, sessionName, sessionDuration } = this.state;
    // console.log('this.state.sessionName', sessionName);
    const submitData = {

      session: {
        name: sessionName,
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

        counter++;

      }

    }
    // console.log(submitData);

    fetch('api/add-session-and-session-workout-data',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      })
      .then(res => {
        res.json();
        // console.log('res', res);
      });

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
                  <FinishButton addSessionName={this.addSessionName} postRequest={this.postRequest} />
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

// data: {
//   session: {
//     name: 'testSession10',
//       durationInMinutes: 12623,
//         userId: 1
//   },
//   sessionWorkouts:
//   [
//     {
//       sessionId: 2,
//       workoutId: 1,
//       reps: 5,
//       weight: 225,
//       set: 1
//     },
//     {
//       sessionId: 2,
//       workoutId: 1,
//       reps: 6,
//       weight: 235,
//       set: 2
//     },
//     {
//       sessionId: 2,
//       workoutId: 1,
//       reps: 7,
//       weight: 245,
//       set: 3
//     },
//     {
//       sessionId: 2,
//       workoutId: 2,
//       reps: 10,
//       weight: 180,
//       set: 1
//     },
//     {
//       sessionId: 2,
//       workoutId: 2,
//       reps: 11,
//       weight: 185,
//       set: 2
//     }
//   ]
// }
//     };
