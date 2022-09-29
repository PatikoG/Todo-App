import  express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from 'pg' 

const { Pool } = pg;


const pool = new Pool({
    host:'localhost',
    user:'postgres',
    password:'Vergatexav15!',
    port: 5000,
    database:'todo_app',

})


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(cors());

app.get('/', async(req, res) => {
    const connect = await pool.connect()
    const result = await connect.query({
        text:'SELECT * FROM todo'
    })
    res.send(result.rows);
})


app.post('/createnode', async(req, res) => {
    console.log(req);
    const todoApp = req.body
    const connect = await pool.connect()
    const result = await connect.query({
        text:`INSERT INTO todo(text, status) VALUES($1, $2)`,
        values: [
            todoApp.text,
            todoApp.status
        ]
    }) 
    const select = await connect.query({
        text:'SELECT * FROM todo'
    })
    res.send(select.rows);
})


app.listen(3005);


