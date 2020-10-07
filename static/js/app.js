function init() {

  var CHART = d3.selectAll("#bar").node();
  // Use D3 fetch to read the JSON file
  // The data from the JSON file is arbitrarily named importedData as the argument
  d3.json("samples.json").then(importedData => {
  //  console.log(importedData);
    var data = importedData;

  // Get just the "testsubject ids" from the data set
    justtestsubjects = data.names;

  // Get just the "samples" from the data set
    justsamples = data.samples;

  // Get just the "metadata" from the data set
    justmetadata = data.metadata;

  //********************************************/
  // Populate data in test subject select dropdown list
  //********************************************/
  // Select d3 input element
  const subjectselect = d3.select("#selDataset");

  // Build the Test Subject ID drop down list
  justtestsubjects.forEach(namevalue =>{
    var option = subjectselect.append("option");
    option.text(namevalue);
    option.attr("value",namevalue);
  });
 //*************************************************/ */
 
  let sampvalues = justsamples[0].sample_values;
  //console.log(sampvalues);
  let otuids = justsamples[0].otu_ids;
  //console.log(otuids);
  let otulabels = justsamples[0].otu_labels;
  //console.log(otulabels);

  // Sort the data array 
  sampvalues.sort(function(a, b) {
      return parseFloat(b) - parseFloat(a);
  });
  //console.log(sampvalues);
  // Slice the first 10 objects for plotting
  sampvalues = sampvalues.slice(0, 10);
  otuids = otuids.slice(0, 10);
  otulabels = otulabels.slice(0,10);

  let otuidslist = []
  for (var i =0; i < otuids.length; i++) {
    otuidtext = 'OTU ' + otuids[i];
    otuidslist.push(otuidtext);
  };
  //console.log(otuidslist);

  //console.log(otuids);
  // Reverse the array due to Plotly's defaults
  sampvalues = sampvalues.reverse();
  otuidslist = otuidslist.reverse();
  otulabels = otulabels.reverse();
  
  // Trace1 for the the bar chart
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
    title: "Top 10 OTUs found in the individual "
  };

  // // Render the plot to the div tag with id "bar"
  Plotly.newPlot(CHART, chartData, layout);
  });
};

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("body").on("change", updatePlotly);

// Use D3 to select the dropdown menu
// var dropdownMenu = d3.select("#selDataset");
// Assign the value of the dropdown menu option to a variable
var CHART = d3.selectAll("#bar").node();
// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  var subjectselect = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = subjectselect.node().value;
  console.log(dataset);
  // Find the index of the subject in the justtestsubjects array
  let subjectindex = justtestsubjects.indexOf(dataset);
  console.log(subjectindex);

  let sampvalues = justsamples[subjectindex].sample_values;
  console.log(sampvalues);
  let otuids = justsamples[subjectindex].otu_ids;
  console.log(otuids);
  let otulabels = justsamples[subjectindex].otu_labels;
  console.log(otulabels);
  // Sort the data array 
  sampvalues.sort(function(a, b) {
      return parseFloat(b) - parseFloat(a);
  });
  //console.log(sampvalues);
  // Slice the first 10 objects for plotting
  sampvalues = sampvalues.slice(0, 10);
  otuids = otuids.slice(0, 10);
  otulabels = otulabels.slice(0,10);

  let otuidslist = []
  for (var i =0; i < otuids.length; i++) {
    otuidtext = 'OTU ' + otuids[i];
    otuidslist.push(otuidtext);
  };
  //console.log(otuidslist);

  //console.log(otuids);
  // Reverse the array due to Plotly's defaults
  sampvalues = sampvalues.reverse();
  otuidslist = otuidslist.reverse();
  otulabels = otulabels.reverse();

 // console.log(otulabels);
  x = sampvalues;
  y = otuidslist;
  text = otulabels;

  // Note the extra brackets around 'x' and 'y'
  Plotly.restyle(CHART, "x", [x]);
  Plotly.restyle(CHART, "y", [y]);
  Plotly.restyle(CHART, "text", [text]);
}
// End of updatePlotly()

init();