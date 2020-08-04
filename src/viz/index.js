// @flow
import * as d3 from 'd3';
import data from '#src/viz/data.json';
import '#src/viz/basketball-court.png';

const buffer = 0;
const width = 94 + buffer;
const height = 50 + buffer;
const scale = 6.6;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let i = 0;
let j = 0;

const svg = d3.select('#root')
    .append('svg')
    .style('width', `${width * scale}px`)
    .style('height', `${height * scale}px`)
    .attr('viewBox', [0, 0, width, height]);

svg
    .append('text')
    .attr('x', (width / 2))
    .attr('y', 5)
    .attr('text-anchor', 'middle')
    .style('font-size', '0.25em');

async function render(possessionIndex, momentIndex) {
    const possession = data[possessionIndex];
    if (!possession) return;

    const { moments, nets } = possession;
    const moment = moments[momentIndex];
    if (!moment) {
        await sleep(40);
        i += 1;
        j = 0;
        render(i, j);
        return;
    }

    svg
        .select('text')
        .text(`P ${i}: ${j} of ${moments.length - 1}`);

    const nodes = [
        ...moment.offense.map(o => ({
            id: o.player.name, ...o.player, ...o.center, isOffense: true,
        })),
        ...moment.defense.map(o => ({
            id: o.player.name, ...o.player, ...o.center, isOffense: false,
        })),
        {
            id: 'ball', ...moment.ball.player, ...moment.ball.center, isBall: true,
        },
    ];
    const links = nets && nets[momentIndex]
        ? nets[momentIndex].map((ll, lli) => ll.map((l, lj) => ({ source: moment.offense[lli].player.name, target: moment.offense[lj].player.name, value: l ? 1 : 0 }))).reduce((a, b) => [...a, ...b], [])
        : [];

    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).strength(0));

    const link = svg
        .selectAll('line')
        .data(links)
        .join('line')
        // .attr('stroke', d => (d.value === 1 ? 'blue' : 'red'))
        .attr('stroke', 'white')
        // .attr('stroke-opacity', d => d.value * 0.7 + 0.2)
        .attr('stroke-opacity', 0)
        .attr('stroke-width', 0.25);

    const node = svg
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('stroke', d => {
            // if (d.name === playerWithBall.player.name) return 'black';
            if (d.id === 'ball') return 'orange';
            // return (d.isOffense ? 'red' : 'green');
            return 'white';
        })
        .attr('stroke-width', 0.5)
        .attr('stroke-opacity', d => (d.id === 'ball' ? 1 : 0))
        .attr('fill-opacity', 0)
        .attr('r', d => {
            if (d.id === 'ball') return 0.5;
            return (d.isOffense ? 0.5 : 3);
        });

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

    await sleep(40);
    j += 1;
    render(i, j);
}

render(i, j);

const Margin = 10;
const Graph = {
    Width: 100,
    Height: 100,
};
const Scale = 5;

function renderMemberGraph({
    representative,
    playerWithBallIdx,
    offense,
    defense,
    net,
    time,
}) {
    if (time !== -1) return;
    if (time !== 1488326706106) return;
    if (!net) return;
    const nodes = [
        ...offense.map(o => ({
            id: o.player.name, ...o.player, ...o.center, isOffense: true,
        })),
        ...defense.map(o => ({
            id: o.player.name, ...o.player, ...o.center, isOffense: false,
        })),
        {
            id: 'ball', ...representative.ball.player, ...representative.ball.center, isBall: true,
        },
    ];

    const name = time;
    const links = net.map((ll, lli) => ll.map((l, lj) => ({ source: representative.offense[lli].player.name, target: representative.offense[lj].player.name, value: l ? 1 : 0 }))).reduce((a, b) => [...a, ...b], []);

    const graphSvg = d3
        .select('#vocab-tray')
        .append('svg')
        .style('width', `${(Graph.Width + 2 * Margin) * Scale}px`)
        .style('height', `${(Graph.Height + 2 * Margin) * Scale}px`)
        .style('display', 'inline-block')
        .attr('viewBox', [0, 0, Graph.Width + 2 * Margin, Graph.Height + 2 * Margin]);

    graphSvg.append('text')
        .attr('x', (Graph.Width / 2))
        .attr('y', 15)
        .attr('text-anchor', 'middle')
        .style('font-size', '0.25em')
        .text(`Member ${name}`);

    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).strength(0));

    const link = graphSvg
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('stroke', d => {
            const color = (d.value === 1 ? 'blue' : 'red');
            return color;
        })
        .attr('stroke-opacity', d => d.value * 0.7 + 0.2)
        .attr('stroke-width', 0.25);

    const node = graphSvg
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('stroke', d => (d.index === playerWithBallIdx ? 'black' : 'red'))
        .attr('stroke-width', 0.5)
        .attr('fill-opacity', 0)
        .attr('r', d => (d.isOffense ? 0.5 : d.r));

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

function renderVocabGraph({
    representative, net, count, playerWithBallIdx, members,
}) {
    const nodes = [
        ...representative.offense.map(o => ({
            id: o.player.name, ...o.player, ...o.center, isOffense: true,
        })),
        ...representative.defense.map(o => ({
            id: o.player.name, ...o.player, ...o.center, isOffense: false,
        })),
        {
            id: 'ball', ...representative.ball.player, ...representative.ball.center, isBall: true,
        },
    ];

    const name = representative.time;
    const links = net.map((ll, lli) => ll.map((l, lj) => ({ source: representative.offense[lli].player.name, target: representative.offense[lj].player.name, value: l ? 1 : 0 }))).reduce((a, b) => [...a, ...b], []);

    const graphSvg = d3
        .select('#vocab-tray')
        .append('svg')
        .style('width', `${(Graph.Width + 2 * Margin) * Scale}px`)
        .style('height', `${(Graph.Height + 2 * Margin) * Scale}px`)
        .style('display', 'inline-block')
        .attr('viewBox', [0, 0, Graph.Width + 2 * Margin, Graph.Height + 2 * Margin]);

    graphSvg.append('text')
        .attr('x', (Graph.Width / 2))
        .attr('y', 15)
        .attr('text-anchor', 'middle')
        .style('font-size', '0.25em')
        .text(`Representative ${name}; freq: ${count}`);

    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).strength(0));

    const link = graphSvg
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('stroke', d => {
            const color = (d.value === 1 ? 'blue' : 'red');
            return color;
        })
        .attr('stroke-opacity', d => d.value * 0.7 + 0.2)
        .attr('stroke-width', 0.25);

    const node = graphSvg
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('stroke', d => (d.index === playerWithBallIdx ? 'black' : 'red'))
        .attr('stroke-width', 0.5)
        .attr('fill-opacity', 0)
        .attr('r', d => (d.isOffense ? 0.5 : d.r));

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

    members.forEach(m => renderMemberGraph({ representative, playerWithBallIdx, ...m }));
}

function renderVocab() {
    const possession = data[i];
    if (!possession) return;

    const { library } = possession;
    library.sort((a, b) => b.count - a.count).forEach(renderVocabGraph);
}

renderVocab();
