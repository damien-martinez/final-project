import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class FinishButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      modalShow: false,
      sessionName: ''
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleShow() {
    this.setState({ modalShow: true });
  }

  handleClose() {
    this.setState({ modalShow: false });
  }

  handleNameChange(e) {
    this.setState({ sessionName: e.target.value });
  }

  handleSubmit(event) {
    if (this.state.sessionName === '') {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    this.handleClose();
    this.props.postRequest(this.state.sessionName);

  }

  render() {
    return (

    <>
        <button variant="primary" onClick={this.handleShow} type='button' className='btn btn-primary btn-md'>Finish</button>

       <Modal show={this.state.modalShow} onHide={this.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title className={'w-100'}>
              <form id="session-name" onSubmit={this.handleSubmit}>
                <label htmlFor="exampleFormControlInput1" className="form-label">Finished workout?</label>
                <input value={this.state.sessionName} onChange={this.handleNameChange} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Add a workout name" />
              </form>
            </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button form="session-name" variant="primary" type="submit">
                Finish
              </Button>
            </Modal.Footer>
        </Modal>
    </>

    );
  }
}
