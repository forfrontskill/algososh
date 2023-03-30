import renderer from 'react-test-renderer';
import { ArrowIcon } from './arrow-icon';
import { AscendingIcon } from './ascending-icon';
import { DescendingIcon } from './descending-icon';
import { ReturnIcon } from './return-icon';

describe('Test Icons components', () => {

    it('ArrowIcon rendering', () => {
        const tree = renderer
            .create(<ArrowIcon />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('AscendingIcon rendering', () => {
        const tree = renderer
            .create(<AscendingIcon />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('DescendingIcon rendering', () => {
        const tree = renderer
            .create(<DescendingIcon />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('ReturnIcon rendering', () => {
        const tree = renderer
            .create(<ReturnIcon />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});