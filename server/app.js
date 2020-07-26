const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3001

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}
const subdivisions = ['Sub1', 'Sub2', 'Sub3', 'Sub4', 'Sub5']
let data = []

app.get('/', (req, res) => {
    res.send(JSON.stringify(data))
})
app.post('/', (req, res) => {
    data.push(req.body)    
})
app.post('/delete',(req, res) => {
    data = data.filter(i => i.id != req.body.id)    
})
app.post('/edit', (req, res) =>{
    const indx = req.body.indx
    data[indx] = req.body.data
})
app.get('/subdivisions',(req, res) => {
    res.send(JSON.stringify(subdivisions))
})

app.listen(PORT)
