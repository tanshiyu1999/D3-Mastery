const svg = d3.select('svg');

// adding attribute to the SVG canvas
svg.style('background-color', 'pink');



// Definite height of SVG canvas by extracting the attribute values from html, however it returns a string, hence we should parse it to number
// parseFloat parses string into a floating point number
// shorthand for parseFloat is +
const height = parseFloat(svg.attr('height'));
const width = +svg.attr('width');

const render = data => {
  // indicate xValue and yValue as separate variables so that our graph can be more Dynamically
  // However for the purposes of learning, the code below still uses d => d.population etc to avoid confusion while learning
  const xValue = d => d.population;
  const yValue = d => d.country;


  // margin records information regarding the numbers used in D3's margin convention
  const margin = {top: 20, right: 40, bottom: 20, left: 100}

  // innerWidth and innerHeight represent the size of the graph after taking translation of D3 Margin Convention into account
  // These values are found in the range method of xScale and yScale
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;



  // 3. USING LINEAR SCALES
  // This creates an instance of d3.scaleLinear
  // Mapping Domain (Data Space) to corresponding values of Range (Screen Space) for quantitative attributes
  // domain functions takes in an array of 2 values, first value being the min value and 2nd being the max value
  // d3.max accepts a data array as first argument and a function as second argument that accepts 1 column of data array as input
  // range functions takes in an array of 2 values, first value being min value and 2nd being the max value
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.population)])
    .range([0, innerWidth]);

  // 4. USING BAND SCALE
  // Maps each string in the array (Domain) to a bandwidth (Range) for ordinal attributes
  // map function
  // padding is used to create padding in yScale
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.country))
    .range([0,innerHeight])
    .padding(0.1);

  // 6. Adding Axes
  // Code should be added below where the scales is defined
  const yAxis = d3.axisLeft(yScale);

  // 5. Using the D3 Margin Convention
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  // Putting the yAxis into this new group element that is newly appended
  yAxis(g.append('g'));

  // Alternatively, you can generate the Axis like This
  // Translation of innerHeight in y axis required as the axisbottom spawns at the top of the graph
  g.append('g').call(d3.axisBottom(xScale))
    .attr('transform', `translate(0, ${innerHeight})`);


  // 2. CREATING RECTANGLES FOR EACH ROW
  // make d3 selection to select all existing rectangles in the page
  // Creating a D3 data join, joining the element with each line of csv data
  // Dynamically append a rectangle for each line of data since in the document, there is no 'rect' element yet
  // d => xScale(d.population) as the second argument of attr.
  // xScale will take in the d.population's column of values and map it to each rect
  // bandwidth is the computed value of a single bar, mapped to each rect
  // The rectangles is appended to const g for purpose of using D3 Margin Convention within the SVG canvas
  g.selectAll('rect').data(data)
    .enter().append('rect')
      .attr('y', d=> yScale(d.country))
      .attr('width', d => xScale(d.population))
      .attr('height', yScale.bandwidth())
};



// 1. REPRESENT A DATA  TABLE IN JAVASCRIPT
// Load data via the csv utility in d3
// returns a promise that resolves when the data is loaded
// in csv('data.csv').then(), pass in a callback function
// callback function is a "Function to execute on each element.""
d3.csv('data.csv').then(data => {

  // parseFloat string population into integer
  data.forEach(d => {
    d.population = +d.population * 1000;
  });

  //
  render(data);
});
