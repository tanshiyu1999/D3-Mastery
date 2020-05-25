//import { select, arc } from 'd3';  this thing does not work for me.

const svg = d3.select('svg');

const height = +svg.attr('height'); //The width and height is a string, parse into a number
const width = +svg.attr('width'); //shortcut for parseFloat is +

const g = svg
  .append('g')
    .attr('transform', `translate(${width/2},${height/2})`);

const circle = g
  .append('circle')
    .attr('r',height/2)
    .attr('fill', '#ebed6d')
    .attr('stroke', 'black');

const eyeSpacing = 100;
const eyeYOffset = -70;
const eyeRadius = 40;
const eyebrowWidth = 70;
const eyebrowHeight = 15;
const eyebrowYOffset = -70;


const eyesGroup = g
  .append('g')
    .attr('transform', `translate(${0},${eyeYOffset})`);

const leftEye = eyesGroup
  .append('circle')
    .attr('r',eyeRadius)
    .attr('cx', -eyeSpacing)

const rightEye = eyesGroup
  .append('circle')
    .attr('r',eyeRadius)
    .attr('cx', eyeSpacing)

const eyebrowsGroup = eyesGroup
  .append('g')
    .attr('transform', `translate(${0},${eyebrowYOffset})`);

eyebrowsGroup
  .transition().duration(2000)
    .attr('transform', `translate(${0},${eyebrowYOffset - 50})`)
  .transition().duration(2000)
    .attr('transform', `translate(${0},${eyebrowYOffset})`);

const leftEyebrow = eyebrowsGroup
  .append('rect')
    .attr('x', -eyeSpacing - eyebrowWidth/2)
    .attr('width', eyebrowWidth)
    .attr('height', eyebrowHeight)


const rightEyebrow = eyebrowsGroup
  .append('rect')
    .attr('x', eyeSpacing - eyebrowWidth/2)
    .attr('width', eyebrowWidth)
    .attr('height', eyebrowHeight)

const mouth = g
  .append('path')
    .attr('d', d3.arc()({
      innerRadius: 190,
      outerRadius: 210,
      startAngle: Math.PI / 3,
      endAngle: Math.PI * 3.33/2
      }))
