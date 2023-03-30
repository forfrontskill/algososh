import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { SolutionLayout } from './solution-layout';

describe('Test SolutionLayout component', () => {

    it('SolutionLayout rendering', () => {
        const tree = renderer
            .create(
                <BrowserRouter>
                    <SolutionLayout title='TEST' />
                </BrowserRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});