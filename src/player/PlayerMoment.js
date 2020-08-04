// @flow
import Point from '#src/object/Point';
import Player from './Player';

class PlayerMoment {
    player: Player;

    center: Point;

    constructor(
        { player }: { player: Player },
        { center }: { center: Point },
    ) {
        this.player = player;

        this.center = center;
    }

    equals(p: PlayerMoment): boolean {
        return (
            this.center.equals(p.center)
            && this.player.equals(p.player)
        );
    }
}

export default PlayerMoment;
