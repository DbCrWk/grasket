// @flow
import Delimiter from '#src/standard/csvDelimiter';

function getPartsFromLine(line: string): {
        seasonId: string,
        monthId: string,
        gameCode: string,
        timeAsString: string,
        teamAsString: string,
        uniformAsQuotedString: string,
        xAsString: string,
        yAsString: string,
        zAsString: string,
        period: string,
        eventId: string,
        gameClockAsString: string,
        playerId: string,
        teamId: string,
        speed: string,
        offDefStatus: string,
} {
    const parts = line.split(Delimiter);
    const [
        seasonId,
        monthId,
        gameCode,
        timeAsString,
        teamAsString,
        uniformAsQuotedString,
        xAsString,
        yAsString,
        zAsString,
        period,
        eventId,
        gameClockAsString,
        playerId,
        teamId,
        speed,
        offDefStatus,
    ] = parts;

    return {
        seasonId,
        monthId,
        gameCode,
        timeAsString,
        teamAsString,
        uniformAsQuotedString,
        xAsString,
        yAsString,
        zAsString,
        period,
        eventId,
        gameClockAsString,
        playerId,
        teamId,
        speed,
        offDefStatus,
    };
}

export default getPartsFromLine;
