import React from 'react';
import parseRoute from './lib/parse-route';
import WorkoutSession from './pages/workout-session';
import Home from './pages/home';

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
    }
    if (route.path === 'workout-session') {
      return <WorkoutSession/>;
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
