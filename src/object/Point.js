// @flow

class Point {
    x: number;

    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    equals(p: Point): boolean {
        return (
            this.x === p.x
            && this.y === p.y
        );
    }

    euclideanDistanceTo(p: Point): number {
        return Math.sqrt((this.y - p.y) ** 2 + (this.x - p.x) ** 2);
    }
}

export default Point;
