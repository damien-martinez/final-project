import React from 'react';
import { Button, Modal } from 'react-bootstrap';
export default class ModalButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      selectedOption: '',
      workoutList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/api/get-workouts')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ workoutList: data });
      });

  }

  handleShow() {
    this.setState({ modalShow: true });
  }

  handleClose() {
    this.setState({ modalShow: false, selectedOption: '' });
  }

  handleChange(e) {
    this.setState({ selectedOption: e.target.value });
  }

  handleSubmit(e) {

    const selectedWorkoutId = this.state.selectedOption;
    const chosenWorkout = this.state.workoutList.find(workout => {
      return workout.workoutId.toString() === selectedWorkoutId;
    });
    if (this.state.selectedOption === '') {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    const workoutCopy = Object.assign({}, chosenWorkout);
    this.handleClose();
    this.props.onSelection(workoutCopy);
  }

  render() {
    return (
    <>
      <div className='row justify-content-end'>
        <div className='col-2 ps-1 pe-1 me-2 mt-4'>
          <div className='d-flex justify-content-end'>
            <button variant="primary" onClick={this.handleShow} type="button" className="btn btn-outline-primary btn-md">Add Workout</button>
          </div>
        </div>

        <Modal show={this.state.modalShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Please Choose Your Next Workout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form id="workout-picker" onSubmit={this.handleSubmit}>
              <select className="form-select" role={'button'} aria-label="Default select example" value={this.state.selectedOption} onChange={this.handleChange} >
                <option disabled value="">Open this select menu</option>
                {
                  this.state.workoutList.map(workout => (
                    <option key={workout.workoutId} value={workout.workoutId}>{workout.name}</option>
                  ))
                }
              </select>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button form="workout-picker" variant="primary" type="submit">
              Add Workout
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
    );
  }

}
