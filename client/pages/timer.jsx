import React from 'react';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 500,
      timerOn: true,
      timerId: null
    };

    this.click = this.click.bind(this);

  }

  componentDidMount() {
    const mountTimerId = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
      this.props.addSessionDuration(this.state.seconds);
    }, 1000);

    this.setState({ timerId: mountTimerId });

  }

  renderPlayOrPause() {
    if (this.state.timerOn) {
      return (
        <i onClick={this.click} className="bi bi-pause-circle me-5 h1"></i>
      );
    } else {
      return (
        <i onClick={this.click} className="bi bi-play-circle me-5 h1"></i>
      );
    }
  }

  click() {

    if (this.state.timerOn) {
      clearInterval(this.state.timerId);
      this.setState({ timerOn: !this.state.timerOn });
    } else {

      const mountTimerId = setInterval(() => {
        this.setState({ seconds: this.state.seconds + 1 });
        this.props.addSessionDuration(this.state.seconds);
      }, 1000);

      this.setState({ timerId: mountTimerId });
      this.setState({ timerOn: !this.state.timerOn });

    }

  }

  render() {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    hours = Math.floor(this.state.seconds / 60 / 60);
    seconds = 60 * hours * 60;
    seconds = this.state.seconds - seconds;
    minutes = Math.floor(seconds / 60);
    seconds = (60 * minutes) + (60 * 60 * hours);
    let leftOverSeconds = this.state.seconds - seconds;
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (leftOverSeconds < 10) {
      leftOverSeconds = `0${leftOverSeconds}`;
    }

    return (
    <>
    <div className='d-flex no-wrap justify-content-end'>
        {this.renderPlayOrPause()}
        <p className='text-end'>{`${hours}:${minutes}:${leftOverSeconds}`}</p>
    </div>

    </>

    );

  }

}
