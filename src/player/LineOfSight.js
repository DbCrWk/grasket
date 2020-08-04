// @flow
import Point from '#src/object/Point';
import LineSegment from '#src/object/LineSegment';
import Line from '#src/object/Line';
import Circle from '#src/object/Circle';

class LineOfSight {
    from: Point;

    to: Point;

    segment: LineSegment;

    constructor(from: Point, to: Point) {
        this.from = from;
        this.to = to;

        const line = Line.byPoints(from, to);
        this.segment = new LineSegment(line, from, to);

        (this: any).doesPointOcclude = this.doesPointOcclude.bind(this);
    }

    doesPointOcclude(p: Point): boolean {
        const occlusionField = new Circle(p, 3);

        const occlusionIntersection = this.segment.getCircleIntersectionPoints(occlusionField);
        return (occlusionIntersection.length > 0);
    }

    doPointsOcclude(occludingPoints: Array<Point>): boolean {
        return occludingPoints.some(this.doesPointOcclude);
    }
}

export default LineOfSight;
