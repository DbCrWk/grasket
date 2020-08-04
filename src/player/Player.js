// @flow
class Player {
    name: string;

    uniformNumber: string;

    constructor(
        { name, uniformNumber }: { name: string, uniformNumber: string },
    ) {
        this.name = name;
        this.uniformNumber = uniformNumber;
    }

    equals(p: Player): boolean {
        return (
            this.name === p.name
        );
    }
}

export default Player;
