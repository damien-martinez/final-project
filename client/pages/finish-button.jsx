import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class FinishButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      modalShow: false
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }

  handleShow() {
    this.setState({ modalShow: true });
  }

  handleClose() {
    this.setState({ modalShow: false });
  }

  render() {
    return (

    <>
        <button variant="primary" onClick={this.handleShow} type='button' className='btn btn-primary btn-md'>Finish</button>

       <Modal show={this.state.modalShow} onHide={this.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>
              <label htmlFor="exampleFormControlInput1" className="form-label">Finished workout?</label>
              <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Add a workout name" /></Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary">
                Finish
              </Button>
            </Modal.Footer>
        </Modal>
    </>

    );
  }
}
