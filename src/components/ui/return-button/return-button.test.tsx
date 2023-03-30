import renderer from 'react-test-renderer';
import { ReturnButton } from './return-button';

describe('Test ReturnButton component', () => {

    it('ReturnButton rendering', () => {
        const tree = renderer
            .create(<ReturnButton  label='test'/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});