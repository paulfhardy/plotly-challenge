// ***********************************************************************
// This program is included as a script in index.html and provides the necessary 
// functionality to load and plot the Belly Button Wash Frequency gauge chart based on
// research data on bacteria growth in human navels. 
// Program developed and tested by : Paul Hardy
// Program developed and tested on : 10-09-2020
// ************************************************************************
   
   
//************************************************************************
// The initGaugeChart() function is called from app.js 
// as part of the init() process that displays all data on the index.html page.
// It defines the data and layout for the Belly button washing Gauge chart 
//*************************************************************************

   function  initGaugeChart() { 
    var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: justmetadata[0].wfreq,
          title: { text: "Belly Button Washing Frequency (Scrubs per week)" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [0, 9] },
            steps: [
              { range: [0, 1], color: "rgb(255,102,102)" },
              { range: [1, 2], color: "rgb(255,153,153)" },
              { range: [2, 3], color: "rgb(255,204,204)" },
              { range: [3, 4], color: "rgb(255,229,204)" },
              { range: [4, 5], color: "rgb(204,255,153)" },
              { range: [5, 6], color: "rgb(178,255,102)" },
              { range: [6, 7], color: "rgb(153,255,51)" },
              { range: [7, 8], color: "rgb(51,255,51)" },
              { range: [8, 9], color: "rgb(0,255,0)" }
            ],
          }
        }
      ];
      
      var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', data, layout);
    };
//End Belly button init gauge chart//

//************************************************************************
// The restyleGaugeChart(subjindex) function is called from app.js 
// from the updatePlotly() function updates all plots on the index.html page
// when the user selects a different Test Subject ID.
// It defines the data and layout for the Belly button washing Gauge chart 
//*************************************************************************
  function restyleGaugeChart(subjindex) {

    value = justmetadata[subjindex].wfreq;
    Plotly.restyle('gauge', "value", [value]);

  };
