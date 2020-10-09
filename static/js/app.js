// ***********************************************************************
// This program is included as a script in index.html and provides the necessary 
// functionality to load and plot data from a JSON file samples.json that includes
// research data on bacteria growth in human navels. 
// Program developed and tested by : Paul Hardy
// Program developed and tested on : 10-07-2020
// ************************************************************************

function init() {
  
  // Variable to select the location of the bar chart from index.html
  var CHART = d3.selectAll("#bar").node();

  // Use D3 fetch to read the JSON file into importedData as the argument.
    d3.json("samples.json").then(importedData => {
    var data = importedData;

  // Get just the "testsubject ids" from the data set
    justtestsubjects = data.names;

  // Get just the "samples" from the data set
    justsamples = data.samples;

  // Get just the "metadata" from the data set
    justmetadata = data.metadata;

  // Pre-Populate data into the Test Subject ID select dropdown list
  // Select the d3 input element for the dropdown
    const subjectselect = d3.select("#selDataset");

  // Build the Test Subject ID drop down list
    justtestsubjects.forEach(namevalue =>{
      var option = subjectselect.append("option");
      option.text(namevalue);
      option.attr("value",namevalue);
    });

  // Build arrays for the primary axes and labels for the bar plot.
  // [0] is used because on init() the first subject ID is 0 
    let sampvalues = justsamples[0].sample_values;
    let otuids = justsamples[0].otu_ids;
    let otulabels = justsamples[0].otu_labels;
  
  // Slice the first 10 objects for plotting - bar chart requirement
    sampvalues = sampvalues.slice(0, 10);
    otuids = otuids.slice(0, 10);
    otulabels = otulabels.slice(0,10);

  // Format OTU ID string
    let otuidslist = otuids.map(otuid => 'OTU ' + otuid);

  // Reverse the arrays to meet Plotly's default requirements
    sampvalues = sampvalues.reverse();
    otuidslist = otuidslist.reverse();
    otulabels = otulabels.reverse();
  
  // Trace for the the bar chart
  var trace = {
    x: sampvalues,
    y: otuidslist,
    text: otulabels,
  //   name: "Greek",
    type: "bar",
    orientation: "h"
  };

  // data
  var chartData = [trace];

  // // Apply the group bar mode to the layout
  var layout = {
    title: "Top 10 OTUs found in the individual subject"
  };

  // Render the plot to the div tag with id "bar"
  Plotly.newPlot(CHART, chartData, layout);
  
  //***********************************
  // Plot the Bubble chart  
  //***********************************
  var trace1 = {
    x: justsamples[0].otu_ids,
    y: justsamples[0].sample_values,
    text: justsamples[0].otu_labels,
    mode: 'markers',
    marker: {
      size: justsamples[0].sample_values,
      color: justsamples[0].otu_ids,
      colorscale: [[0,'rgb(0,0,255)'],[1,'rgb(255,0,0)']]
    }
  };
  
  var data = [trace1];
  
  var layout = {
    title: 'All samples taken for the individual subject',
    showlegend: false
  };
    Plotly.newPlot('bubble', data, layout);

  //*************************************
  // Populate the Demographic Data panel
  //*************************************
    d3.select("#sample-metadata").append("p").text('ID: '+ justmetadata[0].id);
    d3.select("#sample-metadata").append("p").text('Ethnicity: '+ justmetadata[0].ethnicity);
    d3.select("#sample-metadata").append("p").text('Gender: '+ justmetadata[0].gender);
    d3.select("#sample-metadata").append("p").text('Age: '+ justmetadata[0].age);
    d3.select("#sample-metadata").append("p").text('Location: '+ justmetadata[0].location);
    d3.select("#sample-metadata").append("p").text('Bbtype: '+ justmetadata[0].bbtype);
    d3.select("#sample-metadata").append("p").text('Wfreq: '+ justmetadata[0].wfreq);
  
   //***********************************************
   // Plot the Belly button washing Gauge chart 
   //***********************************************
     initGaugeChart();
  });
};  
// End of init() function


//***********************************************************
// Call updatePlotly() when a change takes place to the DOM
//***********************************************************

d3.selectAll("body").on("change", updatePlotly);

var CHART = d3.selectAll("#bar").node();

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  var subjectselect = d3.select("#selDataset");

  // Assign the value of the dropdown menu option to a variable
  var dataset = subjectselect.node().value;
    
  // Find the index of the subject in the justtestsubjects array
  // This is necessary to find all of the dependant data for the 
  // selected subject
    let subjectindex = justtestsubjects.indexOf(dataset);
  
  // Build arrays for the primary axes and labels for the bar plot.
    let sampvalues = justsamples[subjectindex].sample_values;
    let otuids = justsamples[subjectindex].otu_ids;
    let otulabels = justsamples[subjectindex].otu_labels;

  // Slice the first 10 objects for plotting - bar chart requirement
    sampvalues = sampvalues.slice(0, 10);
    otuids = otuids.slice(0, 10);
    otulabels = otulabels.slice(0,10);

  // Format OTU ID string
    let otuidslist = otuids.map(otuid => 'OTU ' + otuid);

  // Reverse the array due to Plotly's defaults
    sampvalues = sampvalues.reverse();
    otuidslist = otuidslist.reverse();
    otulabels = otulabels.reverse();

  // Trace variables for the the bar chart
    x = sampvalues;
    y = otuidslist;
    text = otulabels;

  //***********************************
  // Re-style the Bar chart  
  //***********************************
    Plotly.restyle(CHART, "x", [x]);
    Plotly.restyle(CHART, "y", [y]);
    Plotly.restyle(CHART, "text", [text]);

  //***********************************
  // Re-Plot the Bubble chart  
  //***********************************
    var trace1 = {
      x: justsamples[subjectindex].otu_ids,
      y: justsamples[subjectindex].sample_values,
      text: justsamples[subjectindex].otu_labels,
      mode: 'markers',
      marker: {
        size: justsamples[subjectindex].sample_values,
        color: justsamples[subjectindex].otu_ids,
        colorscale: [[0,'rgb(0,0,255)'],[1,'rgb(255,0,0)']]
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'All samples taken for the individual subject',
      showlegend: false
    };
    
    Plotly.newPlot('bubble', data, layout);

  // Demographic Data Refresh after first clearing the previously selected/updated demographic data

    d3.select("#sample-metadata").selectAll('p').remove();

    d3.select("#sample-metadata").append("p").text('ID: '+ justmetadata[subjectindex].id);
    d3.select("#sample-metadata").append("p").text('Ethnicity: '+ justmetadata[subjectindex].ethnicity);
    d3.select("#sample-metadata").append("p").text('Gender: '+ justmetadata[subjectindex].gender);
    d3.select("#sample-metadata").append("p").text('Age: '+ justmetadata[subjectindex].age);
    d3.select("#sample-metadata").append("p").text('Location: '+ justmetadata[subjectindex].location);
    d3.select("#sample-metadata").append("p").text('Bbtype: '+ justmetadata[subjectindex].bbtype);
    d3.select("#sample-metadata").append("p").text('Wfreq: '+ justmetadata[subjectindex].wfreq);

   //*******************************************************************
   // Call function to restyle Belly button washing Gauge chart restyle
   //*******************************************************************

    restyleGaugeChart(subjectindex);
}
// End of updatePlotly()

init();