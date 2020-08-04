// @flow
import CourtEvent from '#src/player/CourtEvent';
import Player from './Player';

class PassCourtEvent extends CourtEvent {
    from: Player;

    to: Player;

    constructor(
        { time, index }: { time: number, index: number },
        { from, to }: { from: Player, to: Player },
    ) {
        super({ time, index });
        this.from = from;
        this.to = to;
    }
}

export default PassCourtEvent;
