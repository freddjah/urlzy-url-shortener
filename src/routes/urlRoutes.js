const router = require('express').Router()
const urlEncodedMiddleware = require('express').urlencoded()

const UrlController = require('../controllers/UrlController')

// Get all active Urls from visiting IP adress.
router.get('/', UrlController.getAllUrls)

// Get specific Url
router.get('/:url', UrlController.getUrl)

// Save a new Url
router.post('/', urlEncodedMiddleware, UrlController.createUrl)

// Delete an active Url
router.post('/:url/delete', UrlController.deleteUrl)

module.exports = router