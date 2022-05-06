import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import startOfWeek from 'date-fns/startOfWeek';
import format from 'date-fns/format';

export default class BarChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sessions: null,
      formattedSessionsData: null

    };

    this.formatSessionData = this.formatSessionData.bind(this);

  }

  componentDidMount() {
    fetch('/api/get-sessions')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const newData = [];
        for (let i = 0; i < data.length; i++) {
          newData.push(data[i].createdAt);
        }
        this.setState({ sessions: newData });
        this.formatSessionData(newData);
      });

  }

  formatSessionData(sessions) {

    const dates = [];
    const formattedDates = [];

    for (const prop in sessions) {
      dates.push(sessions[prop]);
    }

    for (let i = 0; i < dates.length; i++) {
      const result = startOfWeek(new Date(sessions[i]));
      formattedDates.push(format(result, 'MM/dd/yyyy'));
    }

    const countedDates = {};

    formattedDates.forEach(x => { countedDates[x] = (countedDates[x] || 0) + 1; });

    const colors = ['#c7c8e2', '#7782ba', '#6667ab', '#39327c'];

    const labelData = [];
    const chartData = [];
    const usedColors = [];
    let count = 0;
    for (const countedDatesProp in countedDates) {
      labelData.push(countedDatesProp);
      chartData.push(countedDates[countedDatesProp]);
      if (count === 4) {
        count = 0;
      }
      usedColors.push(colors[count]);
      count++;
    }

    const data = {
      labels: labelData,
      datasets: [{
        data: chartData,
        backgroundColor: usedColors
      }]
    };

    this.setState({ formattedSessionsData: data });

  }

  render() {

    return (
    <>
      <div className='row m-3'>
        <h4>Workouts Per Week</h4>
          {this.state.formattedSessionsData !== null && <Bar data={this.state.formattedSessionsData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              ticks: { precision: 0 },
              plugins: { legend: { display: false } }
            }} />}
      </div>
    </>
    );
  }
}
