import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import RenderSelect from './render-select';

export default class ModalButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutName: null,
      modalShow: false
      // workoutId: null

    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.grabWorkout = this.grabWorkout.bind(this);

  }

  handleShow() {
    this.setState({ modalShow: true });
  }

  handleClose() {
    this.setState({ modalShow: false });
  }

  grabWorkout(workout) {
    this.setState({ workoutName: workout });

  }

  // grabWorkoutId(workoutId) {
  //   this.setState({ workoutId: workoutId });
  // }

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
            <RenderSelect grabWorkout={this.grabWorkout} grabWorkoutId={this.grabWorkoutId}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => { this.handleClose(); this.props.appendWorkoutListProp(this.state.workoutName); }}>
              Add Workout
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
    );
  }

}
