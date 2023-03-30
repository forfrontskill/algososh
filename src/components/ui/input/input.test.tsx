import renderer from 'react-test-renderer';
import { Input } from './input';

describe('Test Input component', () => {

    it('Input rendering', () => {
        const tree = renderer
            .create(<Input />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});