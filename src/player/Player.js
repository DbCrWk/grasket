// @flow
import Point from '#src/object/Point';
import Circle from '#src/object/Circle';

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

    equals(p: Player): boolean {
        return (
            this.center.equals(p.center)
            && this.occlusionField.equals(p.occlusionField)
            && this.name === p.name
            && this.team === p.team
        );
    }
}

export default Player;
