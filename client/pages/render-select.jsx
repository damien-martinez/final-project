import React from 'react';
import RenderOption from './render-option';

export default class RenderSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutData: [],
      selectedOption: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('/api/get-workouts')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ workoutData: data });
      }
      );
  }

  handleChange(e) {

    this.setState({ selectedOption: e.target.value });
    this.props.grabWorkout(e.target.value);

  }

  render() {

    return (
  <>
        <select className="form-select" role={'button'} aria-label="Default select example" value={this.state.selectedOption} onChange={this.handleChange} >
          <option selected>Open this select menu</option>
      {this.state.workoutData.length > 0 &&
      this.state.workoutData.map((workouts, index) => (<RenderOption key={index} data={workouts} workoutName={workouts.name} workoutID={workouts.workoutId} />))
      }
    </select>
  </>
    );
  }
}
