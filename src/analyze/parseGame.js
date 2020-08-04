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
    [number]: {|
        moment: CourtMoment,
        currentPlayer: ?Player,
        count: number,
        graph: {},
    |},
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
        speed,
        offDefStatus,
    ] = parts;

    if (currentTimeAsString !== timeAsString) {
        debug('Cleaning Up', { currentTimeAsString });
        const { offense, defense } = playerListByTeam;
        const ball = playerListByTeam.ball ? playerListByTeam.ball[0] : null;
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
                        isOffense: true,
                        hasBall: playerWithBall && p.name === playerWithBall.name,
                    })),
                    ...defense.map((p: Player) => ({
                        fx: p.center.x,
                        fy: p.center.y,
                        r: p.occlusionField.radius,
                        name: p.name,
                        team: p.team,
                        isOffense: false,
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

    function getTeamIndex() {
        if (offDefStatus === '1') return 'offense';
        if (offDefStatus === '2') return 'defense';
        if (team === '4') return 'ball';
        return 'other';
    }
    const teamIndex = getTeamIndex();
    if (!playerListByTeam[teamIndex]) playerListByTeam[teamIndex] = [];

    playerListByTeam[teamIndex].push(
        new Player(
            { name: playerId, team: teamId }, { center: new Point(x, y), occlusionRadius: 3 },
        ),
    );
});

readInterface.on('close', () => {
    debug('Done', { length: graphByTime.length });
    // raw(json()(graphByTime));

    const total = momentByTime.length;
    momentByTime.forEach((m: CourtMoment, i) => {
        if (i % 100 === 0) {
            debug('Matching Moment', { i, total });
        }
        const currentIsomorphisms: Array<{|
            moment: CourtMoment,
            currentPlayer: Player,
            count: number,
        |}> = Object.values(libraryOfIsomorphisms);
        const c = currentIsomorphisms.find(iso => m.isIsomorphicTo(iso.moment));

        if (c) {
            libraryOfIsomorphisms[c.moment.time].count += 1;
            return;
        }

        libraryOfIsomorphisms[m.time] = {
            moment: m,
            graph: graphByTime[i],
            currentPlayer: m.getPlayerWithBall(),
            count: 1,
        };
    });

    const vocab = Object.values(libraryOfIsomorphisms).sort((a, b) => b.count - a.count);
    raw(json()(vocab));

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
