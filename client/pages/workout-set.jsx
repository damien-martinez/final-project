import React from 'react';

export default class WorkSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: this.props.set.weight,
      reps: this.props.set.reps
    };
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleRepsChange = this.handleRepsChange.bind(this);

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.weight === prevState.weight &&
        this.state.reps === prevState.reps) {
      return;
    }
    this.props.onSetUpdated(this.props.index, this.state);
  }

  handleWeightChange(e) {
    this.setState({ weight: e.target.value });
  }

  handleRepsChange(e) {
    this.setState({ reps: e.target.value });
  }

  render() {

    return (
      <>
        <div className='mt-3 col-2 d-flex'>
          <h4 className="pe-2 mt-2 mb-2 d-inline">Set: </h4>
          <h4 className='mt-2 mb-2 d-inline'>{this.props.index + 1}</h4>
            <button type='button' onClick={() => this.props.removeSet(this.props.index)} className='btn btn-link d-inline'><i className="bi bi-x-circle-fill"></i></button>
        </div>
        <div className='row'>
          <div className="col-6">
            <label htmlFor="exampleFormControlInput1" className="form-label">Pounds:</label>
            <input value={this.state.weight} onChange={this.handleWeightChange} type="number" className="form-control" id="exampleFormControlInput1" placeholder="" min="0" step="5"/>
          </div>
          <div className="col-6">
            <label htmlFor="exampleFormControlInput1" className="form-label">Reps:</label>
            <input value={this.state.reps} onChange={this.handleRepsChange} type="number" className="form-control" id="exampleFormControlInput1" placeholder="" min="0" step="5"/>
          </div>
        </div>
      </>
    );
  }
}
