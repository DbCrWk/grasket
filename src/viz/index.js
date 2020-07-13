// @flow
import * as d3 from 'd3';
import data from '#src/viz/data.json';

console.log('data', data);

const buffer = 0;
const width = 94 + buffer;
const height = 50 + buffer;
const scale = 6.6;

const svg = d3.select('#root')
    .append('svg')
    .style('width', `${width * scale}px`)
    .style('height', `${height * scale}px`)
    .attr('viewBox', [0, 0, width, height]);

function render(i) {
    const dataToRender = data[i];
    if (!dataToRender) return;

    const simulation = d3.forceSimulation(dataToRender.nodes)
        .force('charge', d3.forceManyBody())
        .force('link', d3.forceLink(dataToRender.links).id(d => d.name))
        .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg
        .selectAll('line')
        .data(dataToRender.links)
        .join('line')
        .attr('stroke', d => (d.value === 1 ? 'blue' : 'red'))
        .attr('stroke-opacity', d => d.value * 0.7 + 0.2)
        .attr('stroke-width', 0.25);

    const node = svg
        .selectAll('circle')
        .data(dataToRender.nodes)
        .join('circle')
        .attr('stroke', d => (d.team === '1410' ? 'green' : 'red'))
        .attr('stroke-width', 0.5)
        .attr('fill-opacity', 0)
        .attr('r', d => (d.team === '1410' ? d.r : 0.5));

    node.append('title')
        .text(d => d.name);

    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
    });
}

let j = 0;
setInterval(() => { render(j); j += 1; }, 5);
