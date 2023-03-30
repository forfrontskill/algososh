
import renderer from 'react-test-renderer';
import { Column } from './column';

describe('Test Column component', () => {

    it('Column rendering', () => {
        const tree = renderer
            .create(<Column index={1} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});