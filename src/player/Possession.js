// @flow
import Team from '#src/player/Team';
import CourtMoment from '#src/player/CourtMoment';
import CourtEvent from './CourtEvent';

class Possession {
    game: {|
        code: string,
    |};

    timing: {|
        index: number,
        period: string,
        startTime: number,
        endTime: number,
    |};

    actors: {|
        offense: Team,
        defense: Team,
    |};

    moments: Array<CourtMoment>;

    events: Array<CourtEvent>;

    constructor(
        { gameCode }: { gameCode: string },
        {
            index, period, startTime, endTime,
        }: {
            index: number,
            period: string,
            startTime: number,
            endTime: number,
        },
        { offense, defense }: {
            offense: Team,
            defense: Team,
        },
    ) {
        this.game = { code: gameCode };
        this.timing = {
            index, period, startTime, endTime,
        };
        this.actors = { offense, defense };
        this.events = [];
    }
}

export default Possession;
