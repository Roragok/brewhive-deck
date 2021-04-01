const express = require('express')
const path = require('path')
const random = require('random')
const fs = require('fs')

const app = express()
const port = 7070
const images = 'public/json/images.json'

// load the image data.
let imageData = fs.readFileSync(images, (err, data) => {
  if (err) throw err;
  return data
});

// entry to grab in JSON
let entry = 0

// Default image
let image = {
    "path":"images/men_working.png",
    "alt":"Men at work sign, but instead man is relaxing while drinkiing.",
    "caption": "A wild Frank appears"
}

// parse json/images
let imageJSON = JSON.parse(imageData)
let imagesCount = Object.keys(imageJSON).length - 1

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

  // if we have json data, randomly load an entry for the template
  if(imageJSON){
    // get a random object in the length of json
    entry = random.int(0, imagesCount)
    // pass the image to the template
    image = imageJSON[entry]
  }

  res.render('index', {
    title: 'Deck Status',
    progress: number,
    status: status,
    image: image
  })
})

app.get('/gallery', (req, res) => {
  res.render('swiper', {
    title: 'Gallery',
    images: imageJSON
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
