// server.js : Memuat kode untuk membuat, mengonfigurasi, dan menjalankan server HTTP menggunakan Hapi.

const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        /*
        // Menerapkan CORS pada Web Server
        // chrome://flags/#block-insecure-private-network-requests disable agar CORS dapat aktif.
        */
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);

    // server.start() dilakukan secara asynchronous
    // Karena itu, perlu menjalankannya di dalam fungsi async dan memanggil server.start() menggunakan await.
    await server.start();
    // server.info.uri untuk menampilan alamat lengkap dan port server dijalankan
    console.log(`Server running on, ${server.info.uri}`); 
}

init();






// run EC2 // ssh -i "note-api-webserver.pem" ubuntu@ec2-54-255-228-48.ap-southeast-1.compute.amazonaws.com



















