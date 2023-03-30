import React from 'react';
import { Button } from './button';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
describe('Test Button component', () => {
    
    it('Button rendering', () => {
        const tree = renderer
          .create(<Button text='ButtonTextTest' />)
          .toJSON();
          expect(tree).toMatchSnapshot();
      });

    it('Button creation', () => {
        const context = render(<Button text='ButtonTextTest' />);
    
        const button = screen.getByRole('button');
    
        expect(button).toBeInTheDocument();
    });

    it('Button with text', () => {
        const testText = 'ButtonTextTest';
        const context = render(<Button text={testText} />);

        const buttonText = screen.getByTestId('button-text').textContent;
    
        expect(buttonText).toBe(testText);
    });

    it('Button without text', () => {
        const testText = '';
        const context = render(<Button disabled/>);

        const buttonText = screen.getByTestId('button-text').textContent;
    
        expect(buttonText).toBe(testText);
    });

    it('Button disabled', () => {
        const testText = '';
        const context = render(<Button disabled/>);

        const button = screen.getByRole('button');
    
        expect(button).toBeDisabled();
    });

    it('Button is loading', () => {
        const context = render(<Button isLoader={true}/>);

        const button = screen.getByRole('button');
        const loader = screen.getByAltText('Загрузка.');
        expect(button).toBeInTheDocument();
        expect(loader).toBeInTheDocument();
    });
})
