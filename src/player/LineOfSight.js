// @flow
import Player from '#src/player/Player';
import LineSegment from '#src/object/LineSegment';
import Line from '#src/object/Line';

class LineOfSight {
    from: Player;

    to: Player;

    segment: LineSegment;

    constructor(from: Player, to: Player) {
        this.from = from;
        this.to = to;

        const line = Line.byPoints(from.center, to.center);
        this.segment = new LineSegment(line, from.center, to.center);

        (this: any).doesPlayerOcclude = this.doesPlayerOcclude.bind(this);
        (this: any).doesPlayerOcclude = this.doesPlayerOcclude.bind(this);
    }

    doesPlayerOcclude(p: Player): boolean {
        const occlusionIntersection = this.segment.getCircleIntersectionPoints(p.occlusionField);
        return (occlusionIntersection.length > 0);
    }

    doPlayersOcclude(opposingPlayers: Array<Player>): boolean {
        return opposingPlayers.some(this.doesPlayerOcclude);
    }
}

export default LineOfSight;
