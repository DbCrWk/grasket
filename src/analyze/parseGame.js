// @flow
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { error as errorGn, debug as debugGn } from '#src/util/logger';
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
const courtMomentListByTime = [];
let currentGameClockAsString = null;
let playerListByTeam = {};

readInterface.on('line', line => {
    const parts = line.split(Delimiter);
    const team = parts[TeamIndex];

    if (team === TeamHeading) return;

    if (team === '3') return;
    if (team === '4') return;

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

    if (currentGameClockAsString !== timeAsString) {
        debug('Cleaning Up', { currentGameClockAsString });
        const offense = playerListByTeam[1388];
        const defense = playerListByTeam[1410];
        try {
            debug('Constructing net', { currentGameClockAsString });
            const net = (new CourtMoment(12, offense, defense)).getOcclusionNetwork();
            debug('Net created', { currentGameClockAsString });
            courtMomentListByTime.push(net);
            playerListByTeamByTime.push(playerListByTeam);
        } catch (e) {
            error(e);
        }

        currentGameClockAsString = timeAsString;
        playerListByTeam = {};

        debug('Starting Up', { currentGameClockAsString });
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
    debug('Done', { courtMomentListByTime });
});
