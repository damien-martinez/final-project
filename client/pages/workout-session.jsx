import React from 'react';
import Workout from './workout';
import ModalButton from './modal-button';
import Timer from './timer';
import FinishButton from './finish-button';

export default class WorkoutSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: []
    };

    this.addWorkout = this.addWorkout.bind(this);
    this.handleWorkoutUpdated = this.handleWorkoutUpdated.bind(this);
  }

  addWorkout(exercise) {
    const workout = {
      exercise: exercise,
      sets: [{
        workoutId: exercise.workoutId,
        weight: '',
        reps: ''
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

  render() {

    return (
    <>
      <div className='container-fluid'>
        <div className='row justify-content-between mt-3'>
          <div className='mt-4 col-6'>
            <h1>Workout Session</h1>
          </div>

            <div className='col-6'>

              <Timer />
              <div className='d-flex justify-content-end'>
                  <FinishButton />
                  <button onClick={this.addWorkoutSession} type='button' className='btn btn-primary btn-md ms-4'>Cancel</button>
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
