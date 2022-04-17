import React from 'react';
import RenderExercises from './render-exercises';
import ModalButton from './modal-button';

export default class WorkoutSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutList: []
    };

    this.appendWorkoutList = this.appendWorkoutList.bind(this);

  }

  appendWorkoutList(value) {

    const newWorkoutList = this.state.workoutList.slice();
    newWorkoutList.push(value);
    this.setState({ workoutList: newWorkoutList });
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
              <p className='text-end'>0:00</p>
              <div className='d-flex justify-content-end'>
                  <button type='button' className='btn btn-primary btn-md'>Finish</button>
                  <button type='button' className='btn btn-primary btn-md ms-4'>Cancel</button>
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
