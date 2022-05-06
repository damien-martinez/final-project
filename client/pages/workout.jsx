import React from 'react';
import WorkoutSet from './workout-set';

export default class Workout extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddSet = this.handleAddSet.bind(this);
    this.handleSetUpdated = this.handleSetUpdated.bind(this);
  }

  handleSetUpdated(index, setData) {
    const updatedSets = this.props.workout.sets.slice();
    updatedSets[index] = {
      reps: setData.reps,
      weight: setData.weight,
      workoutId: this.props.workout.exercise.workoutId
    };
    const updatedWorkout = {
      exercise: this.props.workout.exercise,
      sets: updatedSets
    };
    this.props.onWorkoutUpdated(this.props.index, updatedWorkout);
  }

  handleAddSet() {
    const newSet = {
      workoutId: this.props.workout.exercise.workoutId,
      reps: '0',
      weight: '0'
    };
    this.handleSetUpdated(this.props.workout.sets.length, newSet);
  }

  render() {
    return (
      <>
        <div className='d-flex'>
        <h4 className='mt-2 mb-2 d-inline'>{this.props.workout.exercise.name}</h4>
        <button type='button' className='btn btn-link'><i className="bi bi-x-circle-fill"></i></button>
        </div>
        {
          this.props.workout.sets.map((set, index) => (
            <WorkoutSet key={index} index={index} set={set} onSetUpdated={this.handleSetUpdated} />
          ))
        }

        <button type='button' onClick={this.handleAddSet} className='btn btn-primary btn-sm mt-2'>Add Set</button>

      </>
    );
  }
}
