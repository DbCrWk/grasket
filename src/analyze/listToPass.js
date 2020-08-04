// @flow
// @flow
/**
 * This file translates a possession list to a possession list augmented with occlusion networks.
 */

import {
    debug as debugGn,
} from '#src/util/logger';
import Possession from '#src/player/Possession';
import Player from '#src/player/Player';
import PassCourtEvent from '#src/player/Pass.CourtEvent';

const debug = debugGn('analyze:listToPass');

function listToPass(
    list: Array<Possession>,
): Array<Possession> {
    return list.map((p, i) => {
        debug('Handling possession', { possessionIndex: i });

        const { moments } = p;
        moments.reduce((prevMoment, moment, momentIndex) => {
            if (prevMoment) {
                const from = prevMoment.getPlayerWithBall().player;
                const to = moment.getPlayerWithBall().player;
                if (!from.equals(to)) {
                    p.events.push(new PassCourtEvent(
                        { time: prevMoment.time, index: momentIndex - 1 + 1 },
                        { from, to },
                    ));
                }
            }
            return moment;
        }, null);

        return p;
    });
}

export default listToPass;
