import { authSlice, login } from '../../../src/store/auth';
import { demoUser, initialState } from '../../fixtures/authFixtures';

describe('Pruebas en authSlice', () => {
    test('Debe regresar el estado inicial y llamar "auth"', () => {
        expect( authSlice.name ).toBe('auth');
        const state = authSlice.reducer(initialState, {});
        expect( state ).toEqual( initialState );
    });

    test('Debe realizar la autenticación', () => {
        const state = authSlice.reducer(initialState, login( demoUser ));
        expect( state ).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        });
    });
});
