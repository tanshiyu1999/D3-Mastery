// SCALELINEAR DEAL WITH QUANTITATIVE ATTRIBUTES

const svg = d3.select('svg');

svg.style('background-color', 'pink');

const height = parseFloat(svg.attr('height'));
const width = +svg.attr('width');

/* Data Sample
"mpg": "18",
"cylinders": "8",
"displacement": "307",
"horsepower": "130",
"acceleration": "12",
"year": "1970",
"origin": "USA",
"name": "chevolet chevelle malibu",
"weight": "122"
*/

const render = data => {
  // All the stuff that we want to tweak should be here
  const title = "Cars: Horsepower vs. Weight"
  // xValue(d) = d.population
  const xValue = d => d.weight;
  const xAxisLabel = 'Horsepower';

  const yValue = d => d.horsepower;
  const yAxisLabel = 'Weight';

  const margin = {top: 50, right: 40, bottom: 80, left: 150}
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const circleRadius = 8;

  // scatter plot should not have a 0 base line at domain, therefore change to d3.min(data, xValue)
  const xScale = d3.scaleLinear()
    //.domain([d3.min(data, xValue), d3.max(data, xValue)]) this line of code is the same as the line at the bottom
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  // Instead of constructing a d3.bandScale() meant for bar charts, use d3.scalePoint() for circles
  const yScale = d3.scaleLinear()
    // .domain(data.map(yValue)) this code is for something like a bar chart
    .domain(d3.extent(data, yValue))
    .range([0,innerHeight])
    .nice();

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10);
  const yAxisGroup = g.append('g')
    .call(yAxis)
  yAxisGroup.selectAll('.domain')
      .remove();
  // Rotate label by 90 degrees via the transform attribute with the rotate values
  yAxisGroup.append('text')
    .attr('class', 'axis-label')
    .attr('y', -90)
    .attr('x', -innerHeight / 2)
    .attr('fill', 'black')
    .attr('transform', 'rotate(-90)')
    // text-anchor make the SVG in the middle
    .attr('text-anchor','middle')
    .text(yAxisLabel);

  const xAxis = d3.axisBottom(xScale)
    .tickSize(-innerHeight)
    // tickPadding pushes the number away from the axis, creates a padding between number and axis
    .tickPadding(20);

  const xAxisGroup = g.append('g').call(xAxis)
    .attr('transform', `translate(0, ${innerHeight})`);
  xAxisGroup.select('.domain').remove();

  xAxisGroup.append('text')
    .attr('class', 'axis-label')
    .attr('y', 70)
    .attr('x', innerWidth/2)
    .attr('fill', 'black')
    .text(xAxisLabel)

  // 'cy' (and 'cx') is changed, yValue(d) is essentially d.population
  g.selectAll('circle').data(data)
    .enter().append('circle')
      .attr('cy', d => yScale(yValue(d)))
      .attr('cx', d => xScale(xValue(d)))
      .attr('r', circleRadius)

  g.append('text')
    .attr('class', 'title')
    .attr('y', -10)
    .text(title)
};

d3.csv('auto-mpg.csv').then(data => {
  /* Data Sample
  "mpg": "18",
  "cylinders": "8",
  "displacement": "307",
  "horsepower": "130",
  "acceleration": "12",
  "year": "1970",
  "origin": "USA",
  "name": "chevolet chevelle malibu"
  */
  // parsing string numbers into float numbers
  data.forEach(d => {
    d.mpg = +d.mpg;
    d.cylinders = +d.cylinders;
    d.displacement = +d.displacement;
    d.horsepower = +d.horsepower;
    d.weight = +d.weight;
    d.acceleration = +d.acceleration;
    d.year = +d.year;
  });
  render(data);
});
