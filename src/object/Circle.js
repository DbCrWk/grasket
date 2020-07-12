// @flow
import Point from '#src/object/Point';

class Circle {
    center: Point;

    radius: number;

    constructor(center: Point, radius: number) {
        this.center = center;
        this.radius = radius;
    }

    hasPoint(p: Point): boolean {
        const distanceFromRadius = this.center.euclideanDistanceTo(p);
        return distanceFromRadius <= this.radius;
    }

    equals(c: Circle): boolean {
        return (
            this.center.equals(c.center)
            && this.radius === c.radius
        );
    }
}

export default Circle;
