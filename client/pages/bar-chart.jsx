import React from 'react';
import { Bar } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import startOfWeek from 'date-fns/startOfWeek';
import format from 'date-fns/format';

export default class BarChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sessions: null

    };

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
      });

  }

  render() {
    const dates = [];
    const formattedDates = [];

    for (const prop in this.state.sessions) {
      dates.push(this.state.sessions[prop]);
    }

    for (let i = 0; i < dates.length; i++) {
      const result = startOfWeek(new Date(this.state.sessions[i]));
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
        label: 'Workout Sessions Per Week',
        data: chartData,
        backgroundColor: usedColors
      }]
    };

    return (
    <>
    <div className='row m-3'>
          <Bar data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            ticks: { precision: 0 }
          }} />
    </div>
      </>
    );
  }
}
