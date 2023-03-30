import renderer from 'react-test-renderer';
import { RadioInput } from './radio-input';

jest.mock('nanoid', () => ({
    nanoid: jest.fn(()=>'test')
  }))

describe('Test RadioInput component', () => {

    it('RadioInput rendering', () => {
        const tree = renderer
            .create(<RadioInput id='key' label='test' htmlFor='test'/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});