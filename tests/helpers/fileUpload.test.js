import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers';

cloudinary.config({
    cloud_name: 'dbv9rxbt5',
    api_key: '663398484665844',
    api_secret: '17gEX1YVHev_IV8ixXAdCFw35rE',
    secure: true
});

describe('Pruebas en fileUpload helper', () => {
    test('Debe subir el archivo correctamente a cloudinary', async () => {
        const imageUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';

        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'foto.png');
        const url = await fileUpload( file );

        expect( typeof url ).toBe('string');

        const imageId = url.split('/').pop().replace('.png', '');

        await cloudinary.api.delete_resources( 'journal/' + [ imageId ] );

    });

    test('Debe retornar null', async () => {
        const file = new File([], 'foto.jpg');
        const url = await fileUpload( file );
        expect( url ).toBe( null );
    });
});