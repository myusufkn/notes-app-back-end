// handler.js : Memuat seluruh fungsi-fungsi handler yang digunakan pada berkas routes.

const { nanoid } = require('nanoid');
const notes = require('./notes'); 

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };

    // masukan nilai-nilai ke dalam array notes menggunakan method push().
    notes.push(newNote);
    
    // Manfaatkan method array filter() untuk mendapatkan objeknya.
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201); // Response Status
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500); // Response Status
    return response;
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

const getNotesByIdHandler = (request, h) => {
    const { id }= request.params;

    /*
    Setelah mendapatkan nilai id, dapatkan objek note dengan id tersebut dari objek array notes. 
    Manfaatkan method array filter() untuk mendapatkan objeknya.
    */
   const note = notes.filter((n) => n.id === id)[0];

   if (note !== undefined) {
    return {
        status: 'success',
        data: {
            note,
        }
    };
   }

   const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan.',
   });
   response.code(404); // Response Status
   return response;
};

const editNotesByIdHandler = (request, h) => {
    const { id } = request.params; //  kita dapatkan nilai id yang dikirim melalui path parameters.

    const { title, tags, body } = request.payload; // Dapatkan data notes terbaru yang dikirimkan oleh client melalui body request.
    const updatedAt = new Date().toISOString(); // Memperbauri waktu edit.

    /*
    Dapatkan nilai index array pada objek catatan sesuai id yang ditentukan. Untuk melakukannya, gunakanlah method array findIndex().
    Bila note dengan id yang dicari ditemukan, maka index akan bernilai array index dari objek catatan yang dicari. Namun bila tidak ditemukan, 
    maka index bernilai -1. Jadi, kita bisa menentukan gagal atau tidaknya permintaan dari nilai index menggunakan if else.
    */

    const index = notes.findIndex((note) => note.id === id);
    
    if (index !== -1) {
        notes[index] = {
            ...notes[index], //  Spread Syntax
            title,
            tags,
            body,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Notes berhasil diUpdate',
        });
        response.code(200);
        return response;
    };

    const response = h.response({
        status: 'fail',
        message: `Gagal update, ID tidak Ditemukan`, 
    });
    response.code(404); // Response Status
    return response;
};

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    // Lakukan pengecekan terhadap nilai index, pastikan nilainya tidak -1 bila hendak menghapus catatan.
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1); // Untuk menghapus data pada array berdasarkan index, gunakan method array splice().
        const response = h.response({
            status: 'success',
            message: "Catatan Berhasil DiHapus",
        });
        response.code(200);
        return response;
    };

    const response = h.response({
        status:'fail',
        message: 'Catatan gagal dihapus, Id tidak ditemukan',
    });
    response.code(404); 
    return response;
    
    
}



module.exports = { 
    addNoteHandler, 
    getAllNotesHandler, 
    getNotesByIdHandler,
    editNotesByIdHandler,
    deleteNoteByIdHandler
};