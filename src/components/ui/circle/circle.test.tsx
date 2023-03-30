import React from 'react';
import { render, screen } from '@testing-library/react';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';
import renderer from 'react-test-renderer';
describe('Test Circle component', () => {

    it('Button rendering', () => {
        const tree = renderer
          .create(<Circle/>)
          .toJSON();
          expect(tree).toMatchSnapshot();
      });

    it('Circle creation', ()=>{
        const context = render(<Circle />);

        const circle = screen.getByTestId('circle');
    
        expect(circle).toBeInTheDocument();
    });

    it('Circle without text', ()=>{
        const context = render(<Circle />);

        const circleText = screen.getByTestId('circle-text').textContent;
    
        expect(circleText).toBe('');
    });

    it('Circle with text', ()=>{
        const text = 'TestText';
        const context = render(<Circle letter={text}/>);

        const circleText = screen.getByTestId('circle-text').textContent;
    
        expect(circleText).toBe(text);
    });

    it('Circle head', ()=>{
        const text = 'TestText';
        const context = render(<Circle head={text}/>);

        const circleHeadText = screen.getByTestId('circle-head').textContent;
    
        expect(circleHeadText).toBe(text);
    });

    it('Circle head element', ()=>{
        const element = (<div data-testid="element-test"></div>)
        const context = render(<Circle head={element}/>);

        const elementHead = screen.getByTestId('element-test');
    
        expect(elementHead).toBeInTheDocument();
    });

    it('Circle tail', ()=>{
        const text = 'TestText';
        const context = render(<Circle tail={text}/>);

        const circleTailText = screen.getByTestId('circle-tail').textContent;
    
        expect(circleTailText).toBe(text);
    });

    it('Circle tail element', ()=>{
        const element = (<div data-testid="element-test"></div>)
        const context = render(<Circle tail={element}/>);

        const elementTail = screen.getByTestId('element-test');
    
        expect(elementTail).toBeInTheDocument();
    });

    it('Circle index', ()=>{
        const index = 1;
        const context = render(<Circle index={index}/>);

        const circleIndex = screen.getByTestId('circle-index').textContent;
    
        expect(circleIndex).toBe(index.toString());
    });

    it('Circle smile', ()=>{
        const context = render(<Circle isSmall={true}/>);

        const isSmall = screen.getByTestId('circle-main').classList.contains('small');
        expect(isSmall).toBe(true);
    });

    it('Circle default', ()=>{
        const context = render(<Circle state={ElementStates.Default}/>);

        const isSmall = screen.getByTestId('circle-main').classList.contains('default');
        expect(isSmall).toBe(true);
    });

    it('Circle default', ()=>{
        const context = render(<Circle state={ElementStates.Changing}/>);

        const isSmall = screen.getByTestId('circle-main').classList.contains('changing');
        expect(isSmall).toBe(true);
    });

    it('Circle default', ()=>{
        const context = render(<Circle state={ElementStates.Modified}/>);

        const isSmall = screen.getByTestId('circle-main').classList.contains('modified');
        expect(isSmall).toBe(true);
    });
});