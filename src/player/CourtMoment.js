// @flow
import Player from '#src/player/Player';
import LineOfSight from '#src/player/LineOfSight';

class CourtMoment {
    time: number;

    offense: Array<Player>;

    defense: Array<Player>;

    constructor(time: number, offense: Array<Player>, defense: Array<Player>) {
        this.time = time;
        this.offense = offense;
        this.defense = defense;
    }

    getOcclusionNetwork(): Array<Array<boolean>> {
        const occlusionNetwork = this.offense.map(
            o => this.offense.map(
                p => ((o === p) ? true : !(new LineOfSight(o, p)).doPlayersOcclude(this.defense)),
            ),
        );
        return occlusionNetwork;
    }
}

export default CourtMoment;
