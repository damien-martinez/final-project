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
    const newArray = this.state.setCounter;
    newArray.push(0);
    this.setState({ setCounter: newArray });
  }

  render() {
    return (
      <>
        <h4 className='mt-4 mb-4'>{this.props.workoutName}</h4>
        {
        this.state.setCounter.map((counter, index) => (<RenderSet key={index} setNumber={index} />))
        }

        <button onClick={this.appendSetCounter} type='button' className='btn btn-primary btn-sm mt-3'>Add Set</button>

      </>
    );
  }
}
