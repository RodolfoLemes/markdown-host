const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv/config')

const routes = require('./routes')

const app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)


app.listen(process.env.PORT || 3333)