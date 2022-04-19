import React from 'react';
import RenderSet from './render-set';

export default class RenderExercises extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setCounter: [0]
    };

    this.appendSetCounter = this.appendSetCounter.bind(this);
  }

  appendSetCounter() {
    const newArray = this.state.setCounter.slice();
    newArray.push(0);
    this.setState({ setCounter: newArray });
  }

  render() {
    return (
      <>
        <h4 className='mt-2 mb-2'>{this.props.workoutName}</h4>
        {
        this.state.setCounter.map((counter, index) => (<RenderSet key={index} setNumber={index} workoutName={this.props.workoutName} />))
        }

        <button onClick={this.appendSetCounter} type='button' className='btn btn-primary btn-sm mt-2'>Add Set</button>

      </>
    );
  }
}
