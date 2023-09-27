import { ImageList, ImageListItem } from '@mui/material';

export const ImageGallery = ({ images }) => {
    return (
        <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
            { images.map((url, i) => (
                <ImageListItem key={ i }>
                    <img
                        src={ url }
                        srcSet={ url }
                        alt={ `Imagen de la nota número ${ i }` }
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    )
}
