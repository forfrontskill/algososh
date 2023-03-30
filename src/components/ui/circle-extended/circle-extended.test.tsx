import CircleExtended from "./circle-extended";
import renderer from 'react-test-renderer';

describe('Test CircleExtended component', () => {

    it('CircleExtended rendering', () => {
        const tree = renderer
            .create(<CircleExtended main={{index:0}} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});