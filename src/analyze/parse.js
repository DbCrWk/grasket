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
import Team from '#src/player/Team';
import Possession from '#src/player/Possession';
import PlayerMoment from '#src/player/PlayerMoment';
import listToNet from './listToNet';
import netToOcclusivity from './netToOcclusivity';
import listToPass from './listToPass';
import listToLibrary from './listToLibrary';

const error = errorGn('analyze:parseGame');
const debug = debugGn('analyze:parseGame');

const filePath = path.join(__dirname, '..', '..', 'data', 'Duke vs. FL State (1st half).csv');

const readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
});

const Delimiter = ',';

const PossessionList = [];
let currentOffenseTeamId = null;
let currentDefenseTeamId = null;
let alreadyEncounteredPossessionChange = false;
let currentPossessionData = null;

let MomentList = [];
let currentTimeAsString = null;
let currentMomentData = null;

readInterface.on('line', line => {
    const parts = line.split(Delimiter);
    const [
        seasonId,
        monthId,
        gameCode,
        timeAsString,
        teamAsString,
        uniformAsQuotedString,
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
    if (seasonId === '"SEASON_ID"') return;

    const uniformAsString = uniformAsQuotedString.split('"').join('');

    if (
        currentTimeAsString !== timeAsString
    ) {
        currentTimeAsString = timeAsString;

        if (currentMomentData) {
            const courtMoment = new CourtMoment(
                currentMomentData.time,
                currentMomentData.offense,
                currentMomentData.defense,
                currentMomentData.ball,
            );
            MomentList.push(courtMoment);
        }

        currentMomentData = {
            time: parseInt(timeAsString, 10),
            offense: [],
            defense: [],
            ball: new PlayerMoment({ player: new Player({ name: 'ball', uniformNumber: '-1' }) }, { center: new Point(0, 0) }),
        };
    }

    // B. Wrap up possession if necessary
    if (
        (
            offDefStatus === '1'
            && teamId !== currentOffenseTeamId
        )
        || (
            offDefStatus === '2'
            && teamId !== currentDefenseTeamId
        )
    ) {
        if (
            offDefStatus === '1'
            && teamId !== currentOffenseTeamId
        ) currentOffenseTeamId = teamId;

        if (
            offDefStatus === '2'
            && teamId !== currentDefenseTeamId
        ) currentDefenseTeamId = teamId;

        if (alreadyEncounteredPossessionChange) {
            alreadyEncounteredPossessionChange = false;
        } else {
            alreadyEncounteredPossessionChange = true;
            if (currentPossessionData) {
                const previousPossession = new Possession(
                    { gameCode: currentPossessionData.game.code },
                    currentPossessionData.timing,
                    currentPossessionData.actors,
                );
                previousPossession.moments = MomentList;
                PossessionList.push(previousPossession);
                MomentList = [];
            }

            currentPossessionData = {
                game: {
                    code: gameCode,
                },
                timing: {
                    index: currentPossessionData ? currentPossessionData.timing.index + 1 : 0,
                    period,
                    startTime: parseInt(timeAsString, 10),
                    endTime: parseInt(timeAsString, 10),
                },
                actors: {
                    offense: new Team([], { name: '', code: '' }),
                    defense: new Team([], { name: '', code: '' }),
                },
            };
        }
    }
    if (currentPossessionData) currentPossessionData.timing.endTime = parseInt(timeAsString, 10);

    const currentPlayer = new Player({ name: playerId, uniformNumber: uniformAsString });
    const x = parseFloat(xAsString);
    const y = parseFloat(yAsString);
    const playerMoment = new PlayerMoment({ player: currentPlayer }, { center: new Point(x, y) });

    if (currentPossessionData) {
        if (offDefStatus === '1') {
            currentPossessionData.actors.offense.name = teamId;
            currentPossessionData.actors.offense.code = teamId;

            if (!currentPossessionData.actors.offense.contains(currentPlayer)) {
                currentPossessionData.actors.offense.players.push(currentPlayer);
            }

            if (currentMomentData) {
                currentMomentData.offense.push(playerMoment);
            }
        }

        if (offDefStatus === '2') {
            currentPossessionData.actors.defense.name = teamId;
            currentPossessionData.actors.defense.code = teamId;

            if (!currentPossessionData.actors.defense.contains(currentPlayer)) {
                currentPossessionData.actors.defense.players.push(currentPlayer);
            }

            if (currentMomentData) {
                currentMomentData.defense.push(playerMoment);
            }
        }

        if (teamAsString === '4') {
            if (currentMomentData) {
                currentMomentData.ball = playerMoment;
            }
        }
    }
});

readInterface.on('close', () => {
    // Clean up the last possession
    if (currentPossessionData) {
        const previousPossession = new Possession(
            { gameCode: currentPossessionData.game.code },
            currentPossessionData.timing,
            currentPossessionData.actors,
        );
        previousPossession.moments = MomentList;
        PossessionList.push(previousPossession);
    }

    debug('Done', { PossessionListLength: PossessionList.length });
    PossessionList.forEach(p => {
        p.moments.forEach(m => {
            const { offense, defense } = m;
            const points = [...offense.map(p => [p.center.x, p.center.y]), ...defense.map(p => [p.center.x, p.center.y])].reduce((a, b) => [...a, ...b]);
            raw(points.join(','));
        });
    });

    // raw(json({ pretty: true })(PossessionList));

    // const net = listToNet(PossessionList);
    // // raw(json({ pretty: true })(net));
    // const occlusivity = netToOcclusivity(net);
    // const updatedList = listToPass(PossessionList);
    // occlusivity.forEach((oo, possessionIndex) => {
    //     oo.forEach((o, momentIndex) => {
    //         const event = updatedList[possessionIndex].events.find(e => e.index === momentIndex);
    //         if (o) console.log(`${o},${event ? 1 : 0}`);
    //     });
    // });

    // const maxLength = occlusivity.reduce((acc, curr) => Math.max(acc, curr.length), 0);
    // for (let index = 0; index < maxLength; index += 1) {
    //     const line = [];

    //     occlusivity.forEach((o, possessionIndex) => {
    //         line.push(o[index] || '');
    //         const event = updatedList[possessionIndex].events.find(e => e.index === index);
    //         line.push(event ? o[index] || '' : '');
    //     });

    //     // const line = occlusivity.map(aa => aa[index] || '');
    //     console.log(line.join('\t'));
    // }
    // updatedList.forEach(p => {
    //     console.log(p.events);
    // });
    // raw(json({ pretty: true })(updatedList));

    // const listWithLibrary = listToLibrary(net);

    // const hmmList: Array<{ rep: number, ent: number }> = [];
    // listWithLibrary.forEach((p, possessionIndex) => {
    //     p.repList.forEach((r, momentIndex) => {
    //         const event = updatedList[possessionIndex].events.find(e => e.index === momentIndex);

    //         if (possessionIndex === 0) {
    //             hmmList.push({ rep: r, ent: event ? 1 : 0 });
    //             // console.log(`${r}\t${event ? 1 : 0}`);
    //         }
    //     });
    //     // console.log('\n');
    // });
    // const hmmStates = [...(new Set(hmmList.map(l => l.rep)))];
    // const pi = (new Array(hmmStates.length)).fill(0);
    // hmmList.forEach(({ rep }) => {
    //     const i = hmmStates.findIndex(r => r === rep);
    //     pi[i] += 1;
    // });
    // const sumPi = pi.reduce((acc, x) => acc + x, 0);
    // const normalizedPi = pi.map(p => p / sumPi);
    // console.log('normalizedPi', normalizedPi);

    // const Abase = (new Array(hmmStates.length)).fill(0);
    // const A = Abase.map(() => (new Array(hmmStates.length)).fill(0));

    // hmmList.reduce((prevRep, { rep }) => {
    //     if (prevRep !== null) {
    //         const i = hmmStates.findIndex(r => r === prevRep);
    //         const j = hmmStates.findIndex(r => r === rep);
    //         A[i][j] += 1;
    //     }
    //     return rep;
    // }, null);
    // A.forEach(aa => {
    //     console.log(aa.join('\t'));
    // });

    // const Bbase = (new Array(hmmStates.length)).fill(0);
    // const B = Bbase.map(() => (new Array(2)).fill(0));

    // hmmList.forEach(({ rep, ent }) => {
    //     const i = hmmStates.findIndex(r => r === rep);
    //     B[i][ent] += 1;
    // });
    // B.forEach(aa => {
    //     console.log(aa.join('\t'));
    // });

    // jmm processing
    // const jmmMap = {};

    // hmmList.reduce((prevRep, { rep }) => {
    //     if (!jmmMap[rep]) {
    //         jmmMap[rep] = [0];
    //     }

    //     if (prevRep !== null) {
    //         jmmMap[prevRep][jmmMap[prevRep].length - 1] += 1;
    //         if (prevRep !== rep) {
    //             jmmMap[prevRep].push(0);
    //         }
    //     }
    //     return rep;
    // }, null);

    // console.log('jmmMap', jmmMap);

    // raw(json({ pretty: true })(listWithLibrary));
});
