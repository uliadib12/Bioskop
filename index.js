const express = require('express');
const app = express();
const port = 3002;

const dbconfig = require('./config');
const response = require('./request');

const bodyParser = require('body-parser');

async function main(){
    const db = await dbconfig();
    app.use(bodyParser.json());

    // GET REQUEST
    app.get('/film', (req, res) => {
        const sql = "SELECT * FROM film";
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }

            response(200, result, 'data film', res);
        });
    });

    app.get('/studio', (req, res) => {
        const sql = "SELECT * FROM studio";
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }

            response(200, result, 'data studio', res);
        });
    });

    app.get('/pelanggan', (req, res) => {
        const sql = "SELECT * FROM pelanggan";
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }

            response(200, result, 'data pelanggan', res);
        });
    });

    app.get('/penayangan', (req, res) => {
        const sql = "SELECT * FROM penayangan";
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }

            response(200, result, 'data penayangan', res);
        });
    });

    app.get('/pemesanan', (req, res) => {
        const sql = "SELECT * FROM pemesanan";
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }

            response(200, result, 'data pemesanan', res);
        });
    });

    app.get('/film/:id', (req, res) => {
        const { id } = req.params;
        const sql = `SELECT * FROM film WHERE id_film = ${id}`;
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }

            response(200, result, 'data film', res);
        });
    });

    app.get('/studio/:id', (req, res) => {
        const { id } = req.params;
        const sql = `SELECT * FROM studio WHERE id_studio = ${id}`;
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }

            response(200, result, 'data studio', res);
        });
    });

    app.get('/pelanggan/:id', (req, res) => {
        const { id } = req.params;
        const sql = `SELECT * FROM pelanggan WHERE id_pelanggan = ${id}`;
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }

            response(200, result, 'data pelanggan', res);
        });
    });

    app.get('/penayangan/:id', (req, res) => {
        const { id } = req.params;
        const sql = `SELECT * FROM penayangan WHERE id_penayangan = ${id}`;
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }

            response(200, result, 'data penayangan', res);
        });
    });

    app.get('/pemesanan/:id', (req, res) => {
        const { id } = req.params;
        const sql = `SELECT * FROM pemesanan WHERE id_pemesanan = ${id}`;
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }

            response(200, result, 'data pemesanan', res);
        });
    });

    // POST REQUEST
    app.post('/film', (req, res) => {
        const {judul, deskripsi, durasi, genre, tanggal_rilis} = req.body;
        const tanggal_rilis_format = new Date(tanggal_rilis).toISOString().slice(0, 19).replace('T', ' ');
        const sql = `INSERT INTO film (judul, deskripsi, durasi, genre, tanggal_rilis) VALUES ('${judul}', '${deskripsi}', '${durasi}', '${genre}', '${tanggal_rilis_format}')`;
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }

            response(200, result, 'data film berhasil ditambahkan', res);
        });
    });

    app.post('/studio', (req, res) => {
        const {nama_studio, lokasi} = req.body;
        const sql = `INSERT INTO studio (nama_studio, lokasi) VALUES ('${nama_studio}', '${lokasi}')`;
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }

            response(200, result, 'data studio berhasil ditambahkan', res);
        });
    });

    app.post('/pelanggan', (req, res) => {
        const {nama, no_telp, alamat} = req.body;
        const sql = `INSERT INTO pelanggan (nama, no_telp, alamat) VALUES ('${nama}', '${no_telp}', '${alamat}')`;
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }

            response(200, result, 'data pelanggan berhasil ditambahkan', res);
        });
    });

    app.post('/penayangan', (req, res) => {
        const {film_id, studio_id, tanggal, waktu_mulai, waktu_selesai, harga_tiket, max_tiket} = req.body;
        const tanggal_format = new Date(tanggal).toISOString().slice(0, 19).replace('T', ' ');
        const sql = `INSERT INTO penayangan (film_id, studio_id, tanggal, waktu_mulai, waktu_selesai, harga_tiket, max_tiket) VALUES ('${film_id}', '${studio_id}', '${tanggal_format}', '${waktu_mulai}', '${waktu_selesai}', '${harga_tiket}', '${max_tiket}')`;
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }

            response(200, result, 'data penayangan berhasil ditambahkan', res);
        });
    });

    app.post('/pemesanan', (req, res) => {
        const {penayangan_id, pelanggan_id, jumlah_tiket, total_harga, status_pembayaran, tanggal_pemesanan} = req.body;
        const tanggal_pemesanan_format = new Date(tanggal_pemesanan).toISOString().slice(0, 19).replace('T', ' ');
        const sql = `INSERT INTO pemesanan (penayangan_id, pelanggan_id, jumlah_tiket, total_harga, status_pembayaran, tanggal_pemesanan) VALUES ('${penayangan_id}', '${pelanggan_id}', '${jumlah_tiket}', '${total_harga}', '${status_pembayaran}', '${tanggal_pemesanan_format}')`;
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }

            response(200, result, 'data pemesanan berhasil ditambahkan', res);
        });
    }); 

    // PUT REQUEST
    app.put('/film/:id', (req, res) => {
        const { id } = req.params;
        const {judul, deskripsi, durasi, genre, tanggal_rilis} = req.body;
        const tanggal_rilis_format = new Date(tanggal_rilis).toISOString().slice(0, 19).replace('T', ' ');
        const sql = `UPDATE film SET judul = '${judul}', deskripsi = '${deskripsi}', durasi = '${durasi}', genre = '${genre}', tanggal_rilis = '${tanggal_rilis_format}' WHERE id_film = ${id}`;
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }
            
            response(200, result, 'data film berhasil diubah', res);
        });
    });

    app.put('/studio/:id', (req, res) => {
        const { id } = req.params;
        const {nama_studio, lokasi} = req.body;
        const sql = `UPDATE studio SET nama_studio = '${nama_studio}', lokasi = '${lokasi}' WHERE id_studio = ${id}`;
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }
            
            response(200, result, 'data studio berhasil diubah', res);
        });
    });

    app.put('/pelanggan/:id', (req, res) => {
        const { id } = req.params;
        const {nama, no_telp, alamat} = req.body;
        const sql = `UPDATE pelanggan SET nama = '${nama}', no_telp = '${no_telp}', alamat = '${alamat}' WHERE id_pelanggan = ${id}`;
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }
            
            response(200, result, 'data pelanggan berhasil diubah', res);
        });
    });

    app.put('/penayangan/:id', (req, res) => {
        const { id } = req.params;
        const {film_id, studio_id, tanggal, waktu_mulai, waktu_selesai, harga_tiket, max_tiket} = req.body;
        const tanggal_format = new Date(tanggal).toISOString().slice(0, 19).replace('T', ' ');
        const sql = `UPDATE penayangan SET film_id = '${film_id}', studio_id = '${studio_id}', tanggal = '${tanggal_format}', waktu_mulai = '${waktu_mulai}', waktu_selesai = '${waktu_selesai}', harga_tiket = '${harga_tiket}', max_tiket = '${max_tiket}' WHERE id_penayangan = ${id}`;
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }
            
            response(200, result, 'data penayangan berhasil diubah', res);
        });
    });

    app.put('/pemesanan/:id', (req, res) => {
        const { id } = req.params;
        const {penayangan_id, pelanggan_id, jumlah_tiket, total_harga, status_pembayaran, tanggal_pemesanan} = req.body;
        const tanggal_pemesanan_format = new Date(tanggal_pemesanan).toISOString().slice(0, 19).replace('T', ' ');
        const sql = `UPDATE pemesanan SET penayangan_id = '${penayangan_id}', pelanggan_id = '${pelanggan_id}', jumlah_tiket = '${jumlah_tiket}', total_harga = '${total_harga}', status_pembayaran = '${status_pembayaran}', tanggal_pemesanan = '${tanggal_pemesanan_format}' WHERE id_pemesanan = ${id}`;
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }
            
            response(200, result, 'data pemesanan berhasil diubah', res);
        });
    });

    // DELETE REQUEST
    app.delete('/film/:id', (req, res) => {
        const { id } = req.params;
        const sql = `DELETE FROM film WHERE id_film = ${id}`;
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }
            
            response(200, result, 'data film berhasil dihapus', res);
        });
    });

    app.delete('/studio/:id', (req, res) => {
        const { id } = req.params;
        const sql = `DELETE FROM studio WHERE id_studio = ${id}`;
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }
            
            response(200, result, 'data studio berhasil dihapus', res);
        });
    });

    app.delete('/pelanggan/:id', (req, res) => {
        const { id } = req.params;
        const sql = `DELETE FROM pelanggan WHERE id_pelanggan = ${id}`;
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }
            
            response(200, result, 'data pelanggan berhasil dihapus', res);
        });
    });

    app.delete('/penayangan/:id', (req, res) => {
        const { id } = req.params;
        const sql = `DELETE FROM penayangan WHERE id_penayangan = ${id}`;
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }
            
            response(200, result, 'data penayangan berhasil dihapus', res);
        });
    });

    app.delete('/pemesanan/:id', (req, res) => {
        const { id } = req.params;
        const sql = `DELETE FROM pemesanan WHERE id_pemesanan = ${id}`;
        db.query(sql, (err, result) => {
            if (err){
                response(500, 'Internal server error', err.message, res);
                return
            }
            
            response(200, result, 'data pemesanan berhasil dihapus', res);
        });
    });

    // run server dengan port menggunakan variabel port
    app.listen(port, () => {
        console.log(`Running in port ${port}`);
    });
}

main();