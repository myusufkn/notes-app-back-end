// routes.js : Memuat kode konfigurasi routing server seperti menentukan path, method, dan handler yang digunakan.

const { 
    addNoteHandler, 
    getAllNotesHandler, 
    getNotesByIdHandler,
    editNotesByIdHandler,
    deleteNoteByIdHandler
} = require("./handler");

const  routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },
    {
        // Menambahkan Catatan
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    {
        // Menampilkan detail catatan.
        method: 'GET',
        path: '/notes/{id}',
        handler: getNotesByIdHandler,
    }, 
    {
        // / Mengubah notes atau edit
        method: "PUT",
        path: "/notes/{id}",
        handler: editNotesByIdHandler, 
    },
    {
        // / Mengubah notes atau edit
        method: "DELETE",
        path: "/notes/{id}",
        handler: deleteNoteByIdHandler, 
    }
];

module.exports = routes;