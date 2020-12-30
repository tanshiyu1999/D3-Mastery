const svg = d3.select('svg');

svg.style('background-color', 'pink');

const height = parseFloat(svg.attr('height'));
const width = +svg.attr('width');

const render = data => {
  const xValue = d => d.population;
  const yValue = d => d.country;
  const margin = {top: 50, right: 40, bottom: 70, left: 180}
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.population)])
    .range([0, innerWidth]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.country))
    .range([0,innerHeight])
    .padding(0.1);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)




  // 2. REMOVING UNNECESSARY LINES
  /* This line of code below is better called as the line of code below
  const yAxis = d3.axisLeft(yScale);
  yAxis(g.append('g'));
  */
  // The call function returns the selection 'g'
  // In order to remove the ticks, we need to select the DOM element to remove and remove them
  // Select the things to remove via selectAll function and by using CSS Selector
  // CSS selector found here: https://www.w3schools.com/cssref/css_selectors.asp
  g.append('g')
    .call(d3.axisLeft(yScale))
    .selectAll('.domain, .tick line')
      .remove();

  // 1.1 FORMATTING NUMBERS - CUSTOM FORMATTING FUNCTION
  // d3.format('.3s') returns a function that takes in argument number (probably the array of number in xScale)
  // This function returns a array of strings, which we proceed to use the replace() method on to replace G with B
  // Replace the format string's G to B
  const xAxisTickFormat = number =>
    d3.format('.3s')(number)
      .replace('G', 'B');

  // 1. FORMAT NUMBERS
  // Number formatting template to be found here: http://bl.ocks.org/zanarmstrong/05c1e95bf7aa16c4768e
  // Put xAxis above the group that calls the xAxis, input the formatting for xAxis
  // tickFormat() is a method of the axis object which takes in a d3.format() function
  // 5. MAKING TICKLINES
  // using tickSize() in xAxis to make the tickline
  const xAxis = d3.axisBottom(xScale)
    .tickFormat(xAxisTickFormat)
    .tickSize(-innerHeight);

  // 2.1 REMOVING UNNECESSARY LINES
  // Same thing as 2, but simply removing the domain class via CSS selector
  // const xAxisGroup is just there for me to proceed with 4. Adding Axis Label
  // When the xAxisGroup is made, we need to separaate the select() as it is selecting the g and not the xAxisGroup
  const xAxisGroup = g.append('g').call(xAxis)
    .attr('transform', `translate(0, ${innerHeight})`);
  xAxisGroup.select('.domain').remove();

  // 4. ADDING AXIS LABELS
  // Same technique is 3. ADDING A VISUALIZATION TITLE
  // This time, append the text element into the xAxisGroup which is inside of the g
  // Giving this a class so that we can select it via CSS selector to customize the xAxisGroup elements
  xAxisGroup.append('text')
    .attr('class', 'axis-label')
    .attr('y', 60)
    .attr('x', innerWidth/2)
    .attr('fill', 'black')
    .text('Population')


  g.selectAll('rect').data(data)
    .enter().append('rect')
      .attr('y', d=> yScale(d.country))
      .attr('width', d => xScale(d.population))
      .attr('height', yScale.bandwidth())

  // 3. ADDING A VISUALIZATION TITLE
  // Appending a text element into the g element which is inside of the svg canvas element
  // text() takes in input as the text
  // Using the attr() to adjust 'y' coordinate of text element
  // Using attr() to add a class so that we can select it via CSS selector
  g.append('text')
    .attr('class', 'title')
    .attr('y', -10)
    .text('Top 10 Most Populous Countries')


};

d3.csv('data.csv').then(data => {

  data.forEach(d => {
    d.population = +d.population * 1000;
  });
  render(data);
});
