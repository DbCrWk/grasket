// @flow
/**
 * This file translates a possession list to a possession list augmented with occlusion networks.
 */

import {
    debug as debugGn,
} from '#src/util/logger';
import Possession from '#src/player/Possession';
import Player from '#src/player/Player';
import CourtMoment from '#src/player/CourtMoment';

const debug = debugGn('analyze:listToNet');

function listToLibrary(
    list: Array<Possession & { nets: Array<Array<Array<boolean>>> }>,
): Array<Possession & { repList: Array<number> } & { library: Array<{ representative: CourtMoment, count: number }> }> {
    return list.map((p, i) => {
        debug('Handling possession', { possessionIndex: i });

        const { moments } = p;
        const library: Array<{
            representative: CourtMoment,
            net: Array<Array<boolean>>,
            playerWithBallIdx: number,
            count: number,
            members: Array<CourtMoment>,
        }> = [];
        const repList = [];

        moments.forEach(m => {
            let found = false;
            library.forEach(lm => {
                if (found) return;
                try {
                    if (lm.representative.isIsomorphicTo(m)) {
                        let net;
                        try {
                            net = m.getOcclusionNetwork();
                        } catch (e) {
                            net = [[]];
                        }
                        lm.count += 1;
                        lm.members.push({ ...m, net });
                        repList.push(lm.representative.time);
                        found = true;
                    }
                } catch (e) {}
            });

            if (!found) {
                let net;
                try {
                    net = m.getOcclusionNetwork();
                } catch (e) {
                    net = [[]];
                }
                repList.push(m.time);
                library.push({
                    representative: m, net, playerWithBallIdx: m.getPlayerIndexWithBall(), count: 1, members: [m],
                });
            }
        });

        return {
            ...p,
            repList,
            library,
        };
    });
}

export default listToLibrary;
