import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrls: [], // https://foto.jpg, https://foto2.jpg...
        // }
    },
    reducers: {
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: ( state, action ) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: ( state, action ) => {
            state.notes = action.payload
        },
        setSaving: ( state ) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: ( state, action ) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                if (note.id === action.payload.id) {
                    return action.payload;
                }
                return note;
            });
            state.messageSaved = `${ action.payload.title } actualizada correctamente`;
        },
        setPhotosToActiveNote: ( state, action ) => {
            state.isSaving = false;
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: ( state, action ) => {
            state.isSaving = false;
            state.notes = state.notes.filter( note => note.id != action.payload );
            state.active = null;
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    setActiveNote,
    setNotes,
    setSaving,
    savingNewNote,
    setPhotosToActiveNote,
    updateNote
} = journalSlice.actions;