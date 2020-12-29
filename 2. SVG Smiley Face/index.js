const svg = d3.select('svg');

// adding attribute to the SVG canvas
svg.style('background-color', 'pink');



// Definite height of SVG canvas by extracting the attribute values from html, however it returns a string, hence we should parse it to number
// parseFloat parses string into a floating point number
// shorthand for parseFloat is +
const height = parseFloat(svg.attr('height'));
const width = +svg.attr('width');

// append a new circle element into the SVG
const circle = svg.append('circle');

// attr takes in 2 argument, the attribute and it's values
// method chaining works because the methods returns the circle element
circle.attr('r', height/2)
      .attr('cx', width/2)
      .attr('cy', height/2)
      .attr('fill', 'yellow')
      .attr('stroke', 'black');

// Defining elements + its attribute at the same time via chaining
const leftEye = svg.append('circle')
  .attr('r', 30)
  .attr('cx', width/2 - 100)
  .attr('cy', height/2 - 70)
  .attr('fill', 'black');

const rightEye = svg.append('circle')
  .attr('r', 30)
  .attr('cx', width/2 + 100)
  .attr('cy', height/2 - 70)
  .attr('fill', 'black');


// created a group element in order to handle the transform attribute
// string template literal with back ticks, placing variable values.
const g = svg.append('g')
  .attr('transform', `translate(${width/2},${height/2})`)


// Creating an arc via d3.arc() inside of the group element
const mouth = g.append('path')
  .attr('d', d3.arc()({
    innerRadius: 150,
    outerRadius:170,
    startAngle:Math.PI/2,
    endAngle: Math.PI * 3/2
  }))

// Creating a eyebrow group
// This group can handle common attributes of the elemenets within the group element
const eyebrowsGroup = svg.append('g')
  .attr('transform', 'translate(0,120)');

// creating an eyebrow
// transition() can create animation
// duration pass in miniseconds
const leftEyebrow = eyebrowsGroup.append('rect')
  .attr('x', 350)
  .attr('width', 80)
  .attr('height',20)
  .transition().duration(2000)
    .attr('y', -50)

const rightEyebrow = eyebrowsGroup.append('rect')
  .attr('x', width - (width/2 - 55))
  .attr('width', 80)
  .attr('height',20)
