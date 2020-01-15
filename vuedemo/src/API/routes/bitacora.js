const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

// routes
router.get('/users', (req, res) => {
  mysqlConnection.query('SELECT * FROM control_acceso_cdc_dbp.usuario_n limit 1;', (err, rows) => {
    if (err) {
      console.log('Fetching Error: ' + err.message);
    } else {
      // logica
      // operaciones - comparaciones - etc
      return res.json(rows);
    }
  });
});

router.get('/bitacora', (req, res) => {
  mysqlConnection.query('SELECT * FROM control_acceso_cdc_dbp.bitacora limit 1;', (err, rows) => {
    if (err) {
      console.log('Fetching Error: ' + err.message);
    } else return res.json(rows);
  });
});

// mysqlConnection.end();
//
module.exports = router;
