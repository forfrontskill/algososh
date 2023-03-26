import React from 'react';

import { render, screen, getByTestId } from '@testing-library/react';
import { StringComponent } from './string';
import { BrowserRouter } from 'react-router-dom';
describe('Test String component', () => {

    it('Even number symbol', () => {
        const {container} = render(
            <BrowserRouter>
                <StringComponent />
            </BrowserRouter>
        );
        const input = getByTestId(container, 'input');
        console.log(input);
        input... // Как установить значение?

        expect(input).toBeInTheDocument();
    })

})