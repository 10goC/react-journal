import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth';
import { checkingAuthentication, startCreatingUserWithEmailPasword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('Pruebas en auth/thunks', () => {

    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('Debe invocar el checkingCredentials', async () => {
        await checkingAuthentication()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    });

    test('startGoogleSignIn debe llamar checkingCredentials y loguearse correctamente', async () => {
        const loginData = { ok: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue( loginData );
        await startGoogleSignIn()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

    test('startGoogleSignIn debe llamar checkingCredentials y mostrar mensaje de error', async () => {
        const loginData = { ok: false, errorMessage: 'Un error en Google' };
        await signInWithGoogle.mockResolvedValue( loginData );
        await startGoogleSignIn()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData ) );
    });

    test('startCreatingUserWithEmailPasword debe llamar checkingCredentials y loguearse correctamente', async () => {
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '1234', displayName: demoUser.displayName };
        await registerUserWithEmailPassword.mockResolvedValue( loginData );
        await startCreatingUserWithEmailPasword( formData )( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( demoUser ) );
    });

    test('startCreatingUserWithEmailPasword debe llamar checkingCredentials y mostrar mensaje de error', async () => {
        const loginData = { ok: false, errorMessage: 'No se ha podido registrar al usuario' };
        const formData = { email: demoUser.email, password: '1234', displayName: demoUser.displayName };
        await registerUserWithEmailPassword.mockResolvedValue( loginData );
        await startCreatingUserWithEmailPasword( formData )( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( { errorMessage: loginData.errorMessage } ) );
    });

    test('startLoginWithEmailAndPassword debe llamar checkingCredentials y loguearse correctamente', async () => {
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '1234' };
        await loginWithEmailPassword.mockResolvedValue( loginData );
        await startLoginWithEmailPassword( formData )( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( demoUser ) );
    });

    test('startLoginWithEmailAndPassword debe llamar checkingCredentials y mostrar mensaje de error', async () => {
        const loginData = { ok: false, errorMessage: 'Contraseña incorrecta' };
        const formData = { email: demoUser.email, password: '1234' };
        await loginWithEmailPassword.mockResolvedValue( loginData );
        await startLoginWithEmailPassword( formData )( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( { errorMessage: loginData.errorMessage } ) );
    });

    test('startLogout debe llamar logoutFirebase, clearNotes y logout', async () => {
        await startLogout()( dispatch );
        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );
    });
});
