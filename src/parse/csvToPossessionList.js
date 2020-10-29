// @flow
import fs from 'fs';
import readline from 'readline';
import {
    /* error as errorGn, */ debug as debugGn,
} from '#src/util/logger';
import Player from '#src/player/Player';
import Point from '#src/object/Point';
import CourtMoment from '#src/player/CourtMoment';
import Team from '#src/player/Team';
import Possession from '#src/player/Possession';
import PlayerMoment from '#src/player/PlayerMoment';
import getPartsFromLine from '#src/parse/util/getPartsFromLine';

// const error = errorGn('parse:csvToPossessionList');
const debug = debugGn('parse:csvToPossessionList');

const OffDefStatusOffense = '1';
const TeamStringBall = '4';

async function csvToPossessionList(filePath: string): Promise<Array<Possession>> {
    const readInterface = readline.createInterface({
        input: fs.createReadStream(filePath),
    });

    const PossessionList = [];
    let currentOffenseTeamId = null;
    let currentDefenseTeamId = null;
    let alreadyEncounteredPossessionChange = false;
    let currentPossessionData = null;

    let MomentList = [];
    let currentTimeAsString = null;
    let currentMomentData = null;

    return new Promise(resolve => {
        readInterface.on('line', line => {
            const {
                seasonId,
                gameCode,
                timeAsString,
                teamAsString,
                uniformAsQuotedString,
                xAsString,
                yAsString,
                period,
                playerId,
                teamId,
                offDefStatus,
            } = getPartsFromLine(line);

            // 1. Handle case where line is just headings
            if (seasonId === '"SEASON_ID"') return;

            // A. Parse strings into better formats
            const timeAsNumber = parseInt(timeAsString, 10);
            const uniformAsString = uniformAsQuotedString.split('"').join('');
            const x = parseFloat(xAsString);
            const y = parseFloat(yAsString);
            const isOffense = offDefStatus === OffDefStatusOffense;

            // 2. Proceed with real data
            // A. Check if time string has changed, which means the previous moment is over
            if (currentTimeAsString !== timeAsString) {
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
                    time: timeAsNumber,
                    offense: [],
                    defense: [],
                    ball: new PlayerMoment({ player: new Player({ name: 'ball', uniformNumber: '-1' }) }, { center: new Point(0, 0) }),
                };
            }

            // B. Check if the offense/defense has changed, which means the possession is over
            if (
                (isOffense && teamId !== currentOffenseTeamId)
            || (!isOffense && teamId !== currentDefenseTeamId)
            ) {
                if (
                    isOffense
            && teamId !== currentOffenseTeamId
                ) currentOffenseTeamId = teamId;

                if (
                    !isOffense
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
                            index: currentPossessionData
                                ? currentPossessionData.timing.index + 1
                                : 0,
                            period,
                            startTime: timeAsNumber,
                            endTime: timeAsNumber,
                        },
                        actors: {
                            offense: new Team([], { name: '', code: '' }),
                            defense: new Team([], { name: '', code: '' }),
                        },
                    };
                }
            }
            if (currentPossessionData) {
                currentPossessionData.timing.endTime = timeAsNumber;
            }

            // C. Process the line
            const currentPlayer = new Player({ name: playerId, uniformNumber: uniformAsString });

            const playerMoment = new PlayerMoment(
                { player: currentPlayer }, { center: new Point(x, y) },
            );

            if (currentPossessionData) {
                if (isOffense) {
                    currentPossessionData.actors.offense.name = teamId;
                    currentPossessionData.actors.offense.code = teamId;

                    if (!currentPossessionData.actors.offense.contains(currentPlayer)) {
                        currentPossessionData.actors.offense.players.push(currentPlayer);
                    }

                    if (currentMomentData) {
                        currentMomentData.offense.push(playerMoment);
                    }
                }

                if (!isOffense) {
                    currentPossessionData.actors.defense.name = teamId;
                    currentPossessionData.actors.defense.code = teamId;

                    if (!currentPossessionData.actors.defense.contains(currentPlayer)) {
                        currentPossessionData.actors.defense.players.push(currentPlayer);
                    }

                    if (currentMomentData) {
                        currentMomentData.defense.push(playerMoment);
                    }
                }

                const isBall = teamAsString === TeamStringBall;
                if (isBall) {
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
            resolve(PossessionList);
        });
    });
}

export default csvToPossessionList;
