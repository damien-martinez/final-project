import React from 'react';
import parseRoute from './lib/parse-route';
import WorkoutSession from './pages/workout-session';
import Home from './pages/home';
import Profile from './pages/profile';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {

    window.addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });

    });

  }

  renderPage() {
    const { route } = this.state;
    if (route === '') {
      return <Home />;
    } else if (route === 'workout-session') {
      return <WorkoutSession/>;
    } else if (route === 'profile') {
      return <Profile />;
    }

  }

  render() {

    return (
    <>
      {this.renderPage()}
    </>

    );
  }
}
