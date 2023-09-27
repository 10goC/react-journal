import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { Navbar } from '../../../src/journal/components/Navbar';
import { store } from '../../../src/store';

describe('Pruebas en <Navbar />', () => {
    test('Debe matchear con el snapshoto', () => {
        const screen = render( <Provider store={ store }><Navbar /></Provider> );
        expect( screen ).toMatchSnapshot();
    });
})