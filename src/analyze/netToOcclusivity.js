// @flow
/**
 * This file translates a net list to an occlusivity list augmented with occlusion networks.
 */

import {
    debug as debugGn,
} from '#src/util/logger';
import Possession from '#src/player/Possession';

const debug = debugGn('analyze:netToOcclusivity');

function netToOcclusivity(
    list: Array<Possession & { nets: Array<Array<Array<boolean>>> }>,
): Array<Array<number>> {
    return list.map((p, i) => {
        debug('Handling net list entry', { netListEntryIndex: i });
        const { nets } = p;
        const ret = nets.map(
            n => (
                n
                    .map(
                        oo => oo.map(o => (o ? 0 : 1)).reduce(
                            (acc, curr) => acc + curr, 0,
                        ),
                    )
                    .reduce((acc, curr) => acc + curr, 0)
            ) / (
                n
                    .map(
                        oo => oo.length,
                    )
                    .reduce((acc, curr) => acc + curr, 0)
            ),
        );
        return ret;
    });
}

export default netToOcclusivity;
