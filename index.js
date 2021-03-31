const express = require('express')
const path = require('path')
const random = require('random')
const fs = require('fs')

const app = express()
const port = 7070
const phrases = 'public/json/phrases.json'
const images = 'public/json/images.json'

app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  // random number for progress bar
  let number = random.int(10,90)
  // default progress to danger
  let status = "danger"
  // if its in the middle have it be warning
  if(number >= 33 && number <= 66){
    status = "warning"
  }
  // over 2/3s have it be success
  if(number >= 66){
    status = "success"
  }

  // length of json object.
  // overloaded right now
  let length = 0
  // entry to grab in JSON
  // overloaded as well
  let entry = 0

  // Default phrase/image
  let phrase = ""
  let image = {
      "path":"images/men_working.png",
      "alt":"Men at work sign, but instead man is relaxing while drinkiing."
  }

  // Load the phrase data.
  pharseData = fs.readFileSync(phrases, (err, data) => {
      if (err) throw err;
      return data
    });
  // load the image data.
  imageData = fs.readFileSync(images, (err, data) => {
        if (err) throw err;
        return data
      });
  // parse json/images
  let pharseJSON = JSON.parse(pharseData)
  let imageJSON = JSON.parse(imageData)
  // if we have json data, randomy get an entry for the template
  if(pharseJSON){
    // get total count of phrases
    length = Object.keys(pharseJSON).length
    // get a random object in the length of json
    entry = random.int(0,(length-1))
    // pass the phrase to the template
    phrase = pharseJSON[entry]
  }
  // if we have json data, randomly load an entry for the template
  if(imageJSON){
    // get total count of images
    length = Object.keys(imageJSON).length
    // get a random object in the length of json
    entry = random.int(0,(length-1))
    // pass the image to the template
    image = imageJSON[entry]
  }

  res.render('index', {
    title: 'Deck Status',
    message: phrase,
    progress: number,
    status: status,
    image: image
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
