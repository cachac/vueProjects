const express = require('express');
const mustacheExpress = require('mustache-express');
const mustache = mustacheExpress();
const bodyParser = require('body-parser');
const { Client } = require('pg');
mustache.cache = null;

const app = express();
app.engine('mustache', mustache);

app.set('view engine', 'mustache');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/add', (req, res) => {
  res.render('med-form');
});

app.post('/meds/add', (req, res) => {
  console.log('POST body', req.body);

  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'medical',
    password: 'wincyre11',
    port: '5432'
  });

  client
    .connect()
    .then(() => {
      console.log('Connection complete!');
      const sql = 'INSERT INTO meds (name, count, brand) values($1, $2, $3);';
      const params = [req.body.name, req.body.count, req.body.brand];
      return client.query(sql, params);
    })
    .then(result => {
      console.log('Results? ', result);
      res.redirect('/meds');
    });
});

app.post('/meds/delete/:id', (req, res) => {
  console.log('POST body', req.body);

  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'medical',
    password: 'wincyre11',
    port: '5432'
  });

  client
    .connect()
    .then(() => {
      const sql = `
        DELETE FROM meds 
        WHERE mid = $1`;
      const params = [req.params.id];
      return client.query(sql, params);
    })
    .then(results => {
      res.redirect('/meds');
    });
});

app.get('/meds/edit/:id', (req, res) => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'medical',
    password: 'wincyre11',
    port: '5432'
  });

  client
    .connect()
    .then(() => {
      const sql = `SELECT * FROM meds 
          WHERE mid = $1`;
      const params = [req.params.id];
      return client.query(sql, params);
    })
    .then(result => {
      console.log('POST body', result);
      res.render('meds-edit', { med: result.rows[0] });
    });
});

app.post('/meds/edit/:id', (req, res) => {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'medical',
        password: 'wincyre11',
        port: '5432'
      });
    
      client
        .connect()
        .then(() => {
          const sql = `UPDATE meds SET name = $1, count= $2, brand=$3
              WHERE mid = $4`;
          const params = [req.body.name, req.body.count, req.body.brand, req.params.id];
          return client.query(sql, params);
        })
        .then(result => {
          console.log('POST body', result);
          res.redirect('/meds');
        });
});

app.get('/meds', (req, res) => {
  console.log('POST body', req.body);

  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'medical',
    password: 'wincyre11',
    port: '5432'
  });

  client
    .connect()
    .then(() => {
      return client.query(`
        SELECT * 
        FROM meds`);
    })
    .then(results => {
      console.log('Results?', results);
      res.render('meds', results);
    });
});

app.listen(5001, () => {
  console.log('listening to port 5001 - Express JS');
});
