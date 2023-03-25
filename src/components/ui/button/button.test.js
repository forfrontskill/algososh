import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from './button';
import { render, screen, fireEvent } from '@testing-library/react';

it('Button with text', () => {
    const context = render(<Button text='ButtonTextTest' />);

    // const buttonRole = screen.getByRole('button');
    
    // console.log('buttonRole~~~~>', buttonRole);

    // const button = screen.getByText((content, element) => {
    //     console.log(content);
    //     return content.startsWith('ButtonTextTest');
    // });

    // const button = screen.getByText('ButtonTextTest');
    const button = screen.getByRole('button');
   
    console.log('~~~~>', button);

    // const instance = component.root;

    // const button = instance.findByType('button');
    // const p = button.findByType('p');
    // const button = getByRole('ButtonTextTest');

    expect(button).toBeInTheDocument();
});