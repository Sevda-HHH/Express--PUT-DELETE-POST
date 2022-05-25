import express from 'express';
import dotenv from 'dotenv';
import { getRequestTimeMiddleware } from './middlewares.js';

const app = express();

const data = [
    {
        "id": 1,
        "name": "Senem",
        "age": 21
    },
    {
        "id": 2,
        "name": "Leyla",
        "age": 21
    },
    {
        "id": 3,
        "name": "Cahandar",
        "age": 21
    }

]

dotenv.config();
const port = process.env.PORT;
// app.use()
app.use(getRequestTimeMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get('/', (req, res) => { 
//     const newdara = data.find(item => item.name == req.query.name);
//     res.json(newdara);
// })

app.get('/', (req, res) => {
    res.json(data);
})

app.get('/cookies', (req, res) => {
    console.log(req.headers.host);
    res.send(req.headers.host);
})

app.get('/songs/:name', (req, res) => {
    const findData = data.find(item => item.name == req.params.name)
    if (findData) {
        res.status(200).json(findData)
    } else {
        res.status(404).send("This data was not found ")
    }
})

// app.post('/', (req, res) => {
//     console.log(req.body)
//     res.json(req.body);
// })

app.put('/data/:id', (req, res) => {
    const selectedData = [...data].find(item => {
        item.id != req.params.id
    })

    if (selectedData) {
        selectedData.push(req.body);
        res.json(selectedData);
    } else {
        res.status(404).send("Ay qardash bu Id vburada ypxdur ")
    }


    // const indexOfdata = data.findIndex(item => {
    //     item.id == req.params.id
    // }) 
    // const newData = [...data];
    // newData[indexOfdata] = { ...req.body, "id": req.params.id };

})

app.delete('/data/:id', (req, res) => {
    const selectedData = [...data].filter(item => {
        return item.id != req.params.id
    })
    res.status(200).json(selectedData);
})

app.post('/data', (req, res) => {
    data[data.length] = { ...req.body };

    res.status(200).json(data);
})

app.listen(port ?? 8000, () => {
    console.log(`App is active ${port}`)
});




