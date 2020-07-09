// @flow
import Point from '../object/Point';
import Circle from '../object/Circle';

class Player {
    name: string;

    team: string;

    center: Point;

    occlusionField: Circle;

    constructor(
        { name, team }: { name: string, team: string },
        { center, occlusionRadius }: { center: Point, occlusionRadius: number },
    ) {
        this.name = name;
        this.team = team;

        this.center = center;
        this.occlusionField = new Circle(center, occlusionRadius);
    }
}

export default Player;
