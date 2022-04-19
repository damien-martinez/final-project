import React from 'react';

export default class RenderSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setNumber: this.props.setNumber + 1,
      pounds: '',
      workoutName: this.props.workoutName,
      reps: ''
    };

    this.handlePoundsChange = this.handlePoundsChange.bind(this);
    this.handleRepsChange = this.handleRepsChange.bind(this);
  }

  handlePoundsChange(e) {
    this.setState({ pounds: e.target.value });
  }

  handleRepsChange(e) {
    this.setState({ reps: e.target.value });
  }

  render() {
    return (
      <>
      <div className="mt-3 row">
        <div className='col-2 d-flex h6'>
            <label htmlFor="exampleFormControlInput1" className="form-label pe-2">Set: </label>
            <p>{this.state.setNumber}</p>
        </div>
        </div>
        <div className='row'>
          <div className="col-6">
            <label htmlFor="exampleFormControlInput1" className="form-label">Pounds:</label>
            <input value={this.state.pounds} onChange={this.handlePoundsChange} type="text" className="form-control" id="exampleFormControlInput1" placeholder=""/>
          </div>
          <div className="col-6">
            <label htmlFor="exampleFormControlInput1" className="form-label">Reps:</label>
            <input value={this.state.reps} onChange={this.handleRepsChange} type="text" className="form-control" id="exampleFormControlInput1" placeholder="" />
          </div>
        </div>
      </>
    );
  }
}
