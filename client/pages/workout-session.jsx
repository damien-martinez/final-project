import React from 'react';
import RenderExercises from './render-exercises';
import ModalButton from './modal-button';
import Timer from './timer';
import FinishButton from './finish-button';

export default class WorkoutSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutList: [],
      data: {
        session: {
          name: 'testSession10',
          durationInMinutes: 12623,
          userId: 1
        },
        sessionWorkouts:
          [
            {
              sessionId: 2,
              workoutId: 1,
              reps: 5,
              weight: 225,
              set: 1
            },
            {
              sessionId: 2,
              workoutId: 1,
              reps: 6,
              weight: 235,
              set: 2
            },
            {
              sessionId: 2,
              workoutId: 1,
              reps: 7,
              weight: 245,
              set: 3
            },
            {
              sessionId: 2,
              workoutId: 2,
              reps: 10,
              weight: 180,
              set: 1
            },
            {
              sessionId: 2,
              workoutId: 2,
              reps: 11,
              weight: 185,
              set: 2
            }
          ]
      }
    };

    this.appendWorkoutList = this.appendWorkoutList.bind(this);
    this.addWorkoutSession = this.addWorkoutSession.bind(this);

  }

  appendWorkoutList(value) {

    const newWorkoutList = this.state.workoutList.slice();
    newWorkoutList.push(value);
    this.setState({ workoutList: newWorkoutList });
  }

  addWorkoutSession() {

    fetch('/api/add-session-and-session-workout-data',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state.data)
      })
      .then(response => {

        const resJSON = response.json();
        resJSON.then(data => {

        });
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

              <Timer />
              <div className='d-flex justify-content-end'>
                  <FinishButton />
                  <button onClick={this.addWorkoutSession} type='button' className='btn btn-primary btn-md ms-4'>Cancel</button>
              </div>
          </div>
        </div>
        <>{this.state.workoutList.length > 0 &&

            this.state.workoutList.map((workout, index) => <RenderExercises key={index} workoutName={workout} />)
          }
        </>
          <ModalButton appendWorkoutListProp={this.appendWorkoutList} />
      </div>
    </>

    );

  }
}
