// @flow
import { errorLib as errorGn } from '#src/util/logger';
import { Tolerance } from '#src/standard/tolerance';
import Point from '#src/object/Point';
import Circle from '#src/object/Circle';
import within from '#src/util/within';

const namespace = 'Object > Line';
const error = errorGn(namespace);

const { areFloatsEqual } = within(Tolerance);

class Line {
    slope: number;

    intercept: number;

    static byPoints(a: Point, b: Point): Line {
        if (a.equals(b)) {
            throw error('.byPoints', 'Points cannot be identical', { a, b });
        }

        if (a.x === b.x) {
            return new Line(Infinity, a.x);
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
            areFloatsEqual(this.slope, line.slope)
            && areFloatsEqual(this.intercept, line.intercept)
        );
    }

    hasPoint(p: Point): boolean {
        if (this.slope === Infinity) {
            return areFloatsEqual(p.x, this.intercept);
        }

        return (
            areFloatsEqual(p.y, this.slope * p.x + this.intercept)
        );
    }

    getPerpendicular(p: Point): Line {
        const getNewSlope = (): number => {
            if (this.slope === Infinity) return 0;
            if (areFloatsEqual(this.slope, 0)) return Infinity;
            return -(1 / this.slope);
        };
        const newSlope = getNewSlope();
        const newIntercept = newSlope === Infinity ? p.x : p.y - (newSlope * p.x);

        return new Line(newSlope, newIntercept);
    }

    getLineIntersectionPoint(line: Line): Point {
        // If the lines are the same, then they do not have a unique intersection point
        if (this.equals(line)) return new Point(0, 0);

        // If the lines are parallel, but not the same, then they do not have an intersection point
        if (areFloatsEqual(this.slope, line.slope)) {
            throw error('.getLineIntersectionPoint', 'Lines are parallel, but not equal and do not have an intersection point', { l: this, r: line });
        }

        // If this line is vertical, then the intersection is simple; we also
        // know that both lines cannot be vertical because this condition has
        // already been checked
        if (this.slope === Infinity) {
            const x = this.intercept;
            const y = line.slope * x + line.intercept;

            return new Point(x, y);
        }

        // Same case above, but flipped
        if (line.slope === Infinity) {
            const x = line.intercept;
            const y = this.slope * x + this.intercept;

            return new Point(x, y);
        }

        // The difference in slope is well-defined and this computation is valid
        const x = (line.intercept - this.intercept) / (this.slope - line.slope);
        const y = this.slope * x + this.intercept;

        return new Point(x, y);
    }

    getEndPointByTravel(start: Point, travel: number): Point {
        if (!this.hasPoint(start)) {
            throw error('.getEndPointByTravel', 'Start point not on line', { l: this, start, travel });
        }

        if (this.slope === Infinity) return new Point(this.intercept, start.y + travel);

        const xTravel = travel / (Math.sqrt(1 + this.slope ** 2));
        const x = start.x + xTravel;
        const y = this.slope * x + this.intercept;

        return new Point(x, y);
    }

    getClosestPoint(p: Point): Point {
        const r = this.getPerpendicular(p);
        return this.getLineIntersectionPoint(r);
    }

    getCircleClosestPoint(circle: Circle): Point {
        return this.getClosestPoint(circle.center);
    }

    getCircleIntersectionPoints(circle: Circle): Array<Point> {
        const closestPoint = this.getCircleClosestPoint(circle);
        const lengthFromClosestPoint = closestPoint.euclideanDistanceTo(circle.center);

        if (lengthFromClosestPoint > circle.radius) {
            return [];
        }

        if (areFloatsEqual(lengthFromClosestPoint, circle.radius)) {
            return [closestPoint];
        }

        const travel = Math.sqrt(circle.radius ** 2 - lengthFromClosestPoint ** 2);
        return [-travel, travel].map(t => this.getEndPointByTravel(closestPoint, t));
    }
}

export default Line;
