// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("samples.json").then(importedData => {
  console.log(importedData);
  var data = importedData;

// Get just the "testsubject ids" from the data set
  justtestsubjects = data.names;
  console.log(justtestsubjects);
// Get just the "samples" from the data set
  justsamples = data.samples;
  console.log(justsamples);
// Get just the "metadata" from the data set
  justmetadata = data.metadata;
  console.log(justmetadata);

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

let sampvalues = justsamples[0].sample_values;
console.log(sampvalues);
let otuids = justsamples[0].otu_ids;
console.log(otuids);
let otulabels = justsamples[0].otu_labels;
console.log(otulabels);

// Sort the data array 
sampvalues.sort(function(a, b) {
    return parseFloat(b) - parseFloat(a);
});
console.log(sampvalues);
// Slice the first 10 objects for plotting
sampvalues = sampvalues.slice(0, 10);
otuids = otuids.slice(0, 10);
otulabels = otulabels.slice(0,10);

let otuidslist = []
for (var i =0; i < otuids.length; i++) {
  otuidtext = 'OTU ' + otuids[i];
  otuidslist.push(otuidtext);
};
console.log(otuidslist);

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
//  margin: {
//    l: 100,
//    r: 100,
//    t: 100,
//    b: 100
//  }
};

// // Render the plot to the div tag with id "bar"
Plotly.newPlot("bar", chartData, layout);
});