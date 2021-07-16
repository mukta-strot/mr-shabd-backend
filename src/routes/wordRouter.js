const process = require('process')
const express = require('express')
const router = express.Router()

const Word = require('../models/words')

router.get('/:word', async (request, response) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(request.params.word)
  }

  const wordToFind = request.params.word
  try {
    const word = await Word.findOne({
      en: wordToFind
    })
    if (word) {
      response.json(word)
    } else {
      throw new Error(`The word '${wordToFind}' is currently not in the database.`)
    }
  } catch (ex) {
    response.json({
      err: ex.message
    })
  }
})

router.post('/', async (request, response) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(request.body.en)
  }

  const receivedWord = request.body
  try {
    const word = new Word({
      en: receivedWord.en,
      mr: receivedWord.mr,
      tags: receivedWord.tags || '',
      en_ex: receivedWord.en_ex || '',
      mr_ex: receivedWord.mr_ex || ''
    })
    const newWord = await word.save()
    if (newWord) {
      response.json(newWord)
    } else {
      throw new Error('Could not save the word')
    }
  } catch (ex) {
    response.json({
      err: ex.message
    })
  }
})

module.exports = router
