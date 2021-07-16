require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const compression = require('compression')
const cors = require('cors')
const process = require('process')

mongoose.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })

app.use(express.json())
app.use(cors())
app.use(compression())

const db = mongoose.connection
db.on('error', (e) => console.log(e))
db.once('open', () => console.log('Connected to Database'))

app.listen(process.env.PORT,
  () => console.log(`Server started @ http://localhost:${process.env.PORT}`))

app.get('/', (_, s) => {
  s.send('Server Up')
})

const wordRouter = require('./routes/wordRouter')
app.use('/word', wordRouter)

module.exports = app
