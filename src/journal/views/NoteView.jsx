import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';

import { ImageGallery } from '../components';
import { useForm } from '../../hooks';
import { setActiveNote, startDeleteNote, startSavingNote, startUploadingFiles } from '../../store';
import Swal from 'sweetalert2';

export const NoteView = () => {

    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );
    const { body, title, date, onInputChange, formState } = useForm( note );
    const dateString = useMemo(() => {
        const d = new Date( date );
        return d.toUTCString();
    }, [ date ]);
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( setActiveNote( formState ) );
    }, [ formState ] );

    useEffect( () => {
        if (!messageSaved.length) return;
        Swal.fire('Nota actualizada', messageSaved, 'success');
    }, [ messageSaved ] );

    const onSaveNote = () => {
        dispatch( startSavingNote() );
    };

    const onFileInputChange = ({ target }) => {
        if (target.files.length === 0) return;
        dispatch( startUploadingFiles( target.files ));
    };

    const onDelete = () => {
        dispatch( startDeleteNote() );
    };

    const fileInputRef = useRef();

    return (
        <Grid
            className="animate__animated animate__fadeIn animate__faster"
            container direction='row'
            justifyContent='space-between'
            sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
            </Grid>

            <Grid item>
                <input
                    type="file"
                    multiple
                    ref={ fileInputRef }
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                />

                <IconButton
                    color="primary"
                    disabled={ isSaving }
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutlined />
                </IconButton>
            
                <Button
                    onClick={ onSaveNote }
                    color='primary'
                    sx={{ p: 2 }}
                    disabled={ isSaving }
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    label='Título'
                    placeholder='Ingrese un título'
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                />

                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='¿Qué sucedió en el día de hoy?'
                    label='Contenido'
                    minRows={ 5 }
                    name="body"
                    value={ body }
                    onChange={ onInputChange }
                />

                <Grid container justifyContent="end">
                    <Button
                        onClick={ onDelete }
                        sx={{ mt: 2 }}
                        color="error"
                    >
                        <DeleteOutline />
                        Borrar
                    </Button>
                </Grid>

                <ImageGallery images={ note.imageUrls } />
            </Grid>
        </Grid>
    )
}
