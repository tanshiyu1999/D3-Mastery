const render = data => {

  //main svg variable
  const svg = d3.select('svg');

  //create header

  //create lines that go up

  //create the formatting, margins etc
  const height = +svg.attr('height');
  const width = +svg.attr('width');
  const margin = {top: 30, right: 50, bottom: 30, left: 100};
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  //my variable hierarchy
  const g1 = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  //create title
  g1.append('text')
    .attr('class', 'title')
    .attr('y', -10)
    .text('Recycling in Singapore');

  //code for xScale
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.recycling_rate)])
    .range([0, innerWidth])

  //code for yScale
  const years = [];
  for (let i = 0; i < data.length; i++) {
    years.push(data[i].year)
  }
  const yScale = d3.scaleBand()
    .domain(years)
    .range([0, innerHeight])
    .padding(0.2);

  //code for axes
  const yAxis = g1.append('g').call(d3.axisLeft(yScale));
  const xAxis = g1.append('g').call(d3.axisBottom(xScale))
    .attr("transform", `translate(0, ${innerHeight})`);

  //Remove the ticks on the y-axis
  yAxis.selectAll('.domain, .tick line')
    .remove();

  //Extend the tick with the x-axis
  xAxis.selectAll('.tick line')
    .attr('')

  //code for the rectangle
  const rect = g1.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
      .attr('y',  d => yScale(d.year))
      .attr('width', d => xScale(d.recycling_rate))
      .attr('height', yScale.bandwidth());
}


d3.csv("recycling-rate-by-waste-type.csv").then(data => {
  //Parsing string values into numbers
  data.forEach(d => {
    d.year = +d.year;
    d.recycling_rate = parseInt(d.recycling_rate);
  })

  //Group all the recycling_rate within the same year
  //Create a new data
  const newArr = [];
  for (let i = 0; i < data.length; i++) {
    if (newArr.map(obj => obj.year).includes(data[i].year)) {
      newArr.forEach( x => {
        if (data[i].year == x.year) {
          x.recycling_rate += data[i].recycling_rate
        }
      })
    } else {
      let year = data[i].year;
      let recycling_rate = data[i].recycling_rate;
      let dict = {year:year, recycling_rate:recycling_rate}
      newArr.push(dict)
    }
  }

  render(newArr);
});











































//k
