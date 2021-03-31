const express = require('express')
const path = require('path')                                                                                                                                                    

const app = express()
const port = 7070


app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Brewhive Deck',
    message: 'Hello there!' })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
