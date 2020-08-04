// @flow
import tolerance from '#src/standard/tolerance';

describe('tolerance', () => {
    it('remains a standard', () => {
        expect.assertions(1);

        expect(tolerance).toMatchSnapshot();
    });
});
