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
}

export default Line;
