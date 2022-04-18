import React from 'react';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
    }, 1000);

  }

  render() {
    // const hours = 0;
    // const minutes = 0;

    return (
  <p className='text-end'>{`00:${this.state.seconds}`}</p>

    );

  }

}
