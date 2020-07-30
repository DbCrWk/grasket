// @flow
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import {
    error as errorGn, debug as debugGn, json, raw,
} from '#src/util/logger';
import Player from '#src/player/Player';
import Point from '#src/object/Point';
import CourtMoment from '#src/player/CourtMoment';

const error = errorGn('analyze:parseGame');
const debug = debugGn('analyze:parseGame');

const filePath = path.join(__dirname, '..', '..', 'data', 'Duke vs. FL State (1st half).csv');

const readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
});

const Delimiter = ',';
const TeamIndex = 4;
const XIndex = 6;
const YIndex = 7;
const TeamHeading = '"TEAM"';

const playerListByTeamByTime = [];
const graphByTime = [];
const momentByTime = [];
let currentTimeAsString = null;
let playerListByTeam = {};

const libraryOfIsomorphisms: {
    [number]: {| moment: CourtMoment, currentPlayer: ?Player, count: number |},
} = {};

readInterface.on('line', line => {
    const parts = line.split(Delimiter);
    const team = parts[TeamIndex];

    if (team === TeamHeading) return;

    if (team === '3') return;

    const [
        seasonId,
        monthId,
        gameCode,
        timeAsString,
        teamAsString,
        uniformAsString,
        xAsString,
        yAsString,
        zAsString,
        period,
        eventId,
        gameClockAsString,
        playerId,
        teamId,
    ] = parts;

    if (currentTimeAsString !== timeAsString) {
        debug('Cleaning Up', { currentTimeAsString });
        const offense = playerListByTeam[1388];
        const defense = playerListByTeam[1410];
        const ball = playerListByTeam[-1] ? playerListByTeam[-1][0] : null;
        try {
            debug('Constructing net', { currentTimeAsString });
            const moment = new CourtMoment(timeAsString, offense, defense, ball);
            const net = moment.getOcclusionNetwork();
            debug('Net created', { currentTimeAsString });
            const playerWithBall = moment.getPlayerWithBall();

            const links = net.map(
                (ll, i) => ll.map(
                    (l, j) => ({
                        source: offense[i].name,
                        target: offense[j].name,
                        value: l ? 1 : 0,
                    }),
                ),
            ).reduce((a, b) => [...a, ...b], []);

            momentByTime.push(moment);
            graphByTime.push({
                name: currentTimeAsString,
                nodes: [
                    ...offense.map((p: Player) => ({
                        fx: p.center.x,
                        fy: p.center.y,
                        r: p.occlusionField.radius,
                        name: p.name,
                        team: p.team,
                        hasBall: playerWithBall && p.name === playerWithBall.name,
                    })),
                    ...defense.map((p: Player) => ({
                        fx: p.center.x,
                        fy: p.center.y,
                        r: p.occlusionField.radius,
                        name: p.name,
                        team: p.team,
                    })),
                ],
                links,
            });
            playerListByTeamByTime.push(playerListByTeam);
        } catch (e) {
            // error(e);
        }

        currentTimeAsString = timeAsString;
        playerListByTeam = {};

        debug('Starting Up', { currentTimeAsString });
    }

    const x = parseFloat(xAsString);
    const y = parseFloat(yAsString);

    if (!playerListByTeam[teamId]) playerListByTeam[teamId] = [];

    playerListByTeam[teamId].push(
        new Player(
            { name: playerId, team: teamId }, { center: new Point(x, y), occlusionRadius: 3 },
        ),
    );
});

readInterface.on('close', () => {
    debug('Done', { length: graphByTime.length });
    // raw(json()(graphByTime));
    momentByTime.forEach((m: CourtMoment, i) => {
        console.log('processing i', i);
        const currentIsomorphisms: Array<{| moment: CourtMoment, currentPlayer: Player, count: number |}> = Object.values(libraryOfIsomorphisms);
        const c = currentIsomorphisms.find(i => m.isIsomorphicTo(i.moment));

        if (c) {
            libraryOfIsomorphisms[c.moment.time].count += 1;
            return;
        }

        libraryOfIsomorphisms[m.time] = {
            moment: m,
            currentPlayer: m.getPlayerWithBall(),
            count: 1,
        };
    });

    console.log('libraryOfIsomorphisms', libraryOfIsomorphisms);

    // raw(json()({
    //     label: 'duke-fs',
    //     $schema: 'https://raw.githubusercontent.com/DbCrWk/graph-norm/development/schema/scaffold/1.0.0.json',
    //     version: '1.0.0',
    //     vertices: [],
    //     edges: [],
    //     graphs: {},
    //     sequence: graphByTime.map(({ name, nodes, links }) => ({ label: name, vertices: nodes.map(n => n.name), edges: links.map(({ source, target }) => [source, target]) })),
    // }));
});
