//import { select, csv, scaleLinear, max, scaleBand, axisLeft, axisBottom, format } from 'd3';  this thing does not work for me.

const svg = d3.select('svg');

const height = +svg.attr('height'); //The width and height is a string, parse into a number
const width = +svg.attr('width'); //shortcut for parseFloat is +

const render = (data) => {
  const xValue = d => d.population;
  const yValue = d => d.country;
  const margin = { top: 50, right: 40, bottom: 75, left: 180}
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, innerWidth])

  const yScale = d3.scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.2);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const xAxisTickFormat = number =>
    d3.format('.3s')(number)
      .replace('G', 'B')

  const xAxis = d3.axisBottom(xScale)
    .tickFormat(xAxisTickFormat)
    .tickSize(-innerHeight);

  g.append('g')
    .call(d3.axisLeft(yScale))
    .selectAll('.domain, .tick line')
      .remove();

  const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0, ${innerHeight})`)

  xAxisG.select('.domain').remove();

  xAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('y', 60)
    .attr('x', innerWidth / 2)
    .attr('fill', 'black')
    .text('Population')

  g.selectAll('rect').data(data)
    .enter().append('rect')
      .attr('y', d => yScale(yValue(d))) // d is the data
      .attr('width', d => xScale(xValue(d)))
      .attr('height', yScale.bandwidth());

  g.append('text')
    .attr('class', 'title')
    .attr('y', -10)
    .text('Top 10 Most Populous Countries');

};

d3.csv('data.csv').then(data => {
  data.forEach(d => {
    d.population = +d.population * 1000;
  })
  render(data)
})
