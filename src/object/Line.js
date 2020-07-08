// @flow
import { errorLib as errorGn } from '../util/logger';
import Point from './Point';

const namespace = 'Object > Line';
const error = errorGn(namespace);

class Line {
    slope: number;

    intercept: number;

    static byPoints(a: Point, b: Point): Line {
        if (a.equals(b)) {
            throw error('.byPoints', 'Points cannot be identical', { a, b });
        }

        if (a.x === b.x) {
            return new Line(Infinity, 0);
        }

        const rise = b.y - a.y;
        const run = b.x - a.x;
        const slope = rise / run;

        const intercept = b.y - (slope * b.x);

        return new Line(slope, intercept);
    }

    constructor(slope: number, intercept: number) {
        this.slope = slope;
        this.intercept = intercept;
    }

    equals(line: Line): boolean {
        return (
            this.slope === line.slope
            && this.intercept === line.intercept
        );
    }

    hasPoint(p: Point): boolean {
        return (
            p.y === this.slope * p.x + this.intercept
        );
    }

    getPerpendicular(p: Point): Line {
        const newSlope = (this.slope === Infinity) ? 0 : -(1 / this.slope);
        const newIntercept = p.y - (newSlope * p.x);

        return new Line(newSlope, newIntercept);
    }

    getLineIntersectionPoint(line: Line): Point {
        // If the lines are the same, then they do not have a unique intersection point
        if (this.equals(line)) return new Point(0, 0);

        // If the lines are parallel, but not the same, then they do not have an intersection point
        if (this.slope === line.slope) {
            throw error('.getLineIntersectionPoint', 'Lines are parallel, but not equal and do not have an intersection point', { l: this, r: line });
        }

        // The difference in slope is well-defined and this computation is valid
        const x = (line.intercept - this.intercept) / (this.slope - line.slope);
        const y = this.slope * x + this.intercept;

        return new Point(x, y);
    }
}

export default Line;
