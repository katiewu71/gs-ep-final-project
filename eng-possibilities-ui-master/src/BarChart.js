import React, { Component } from 'react';
import Plot from 'react-plotly.js'

// class BarChart extends Component {
//     render() {

//         return (
//             <div>
//                 <Plot>
//                     data = {[
//                         {type: 'bar',
//                             x: ['one','two','three'],
//                             y: [29,150,85]}
//                         ]}
//                     layout = { {width: 1000, height: 500, title: 'a simple bar chart'}}
//                 </Plot>
//             </div>
//         )
//     }
// }


class BarChart extends Component {
    render() {
      return (
        <Plot
          data={[
            {
              x: [1, 2, 3],
              y: [2, 6, 3],
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            },
            {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
          ]}
          layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
        />
      );
    }
  }

export default BarChart;