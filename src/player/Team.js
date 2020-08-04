// @flow
import Player from '#src/player/Player';

class Team {
    name: string;

    code: string;

    players: Array<Player>;

    constructor(players: Array<Player>, { name, code }: { name: string, code: string }) {
        this.players = players;
        this.name = name;
        this.code = code;
    }

    contains(player: Player): boolean {
        return !!this.players.find(p => p.equals(player));
    }
}

export default Team;
