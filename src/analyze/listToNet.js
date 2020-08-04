// @flow
/**
 * This file translates a possession list to a possession list augmented with occlusion networks.
 */

import {
    error as errorGn, debug as debugGn, json, raw,
} from '#src/util/logger';
import Possession from '#src/player/Possession';
import Player from '#src/player/Player';

const error = errorGn('analyze:listToNet');
const debug = debugGn('analyze:listToNet');

function listToNet(list: Array<Possession>): Array<Possession & { nets: Array<Array<Array<boolean>>>, playersWithBall: Array<Player> }> {
    return list.map((p, i) => {
        debug('Handling possession', { possessionIndex: i });

        const { moments } = p;
        const nets = moments.map(m => {
            try {
                return m.getOcclusionNetwork();
            } catch (e) {
                return [[]];
            }
        });
        const playersWithBall = moments.map(m => m.getPlayerWithBall());

        return {
            ...p,
            nets,
            playersWithBall,
        };
    });
}

export default listToNet;
