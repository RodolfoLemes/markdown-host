const express = require('express')
const fs = require('fs')
const md = require('./config/markdown-it')

const routes = express.Router()

routes.get('/', (req, res) => {
  const markdowns = []
  const path =  __dirname + '\\..\\markdown\\'

  fs.readdirSync(path).forEach(file => {
    let string = file.replace('.md', '')

    markdowns.push(string)
  });

  return res.render('home', { markdowns })
})

routes.get('/:markdown', (req, res) => {
  const { markdown } = req.params

  try {
    var path =  __dirname + '\\..\\markdown\\' + '\\' + markdown + '.md'
    var file = fs.readFileSync(path, 'utf8')
  } catch (error) {
    return res.send('Error')
  }

  return res.render('index', { markdown: md.render(file.toString()) })
})

module.exports = routes