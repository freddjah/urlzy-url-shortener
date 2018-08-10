const UrlModel = require('../models/Url')
const { TOO_MANY_ERROR, URL_NOT_FOUND_ERROR, SOMETHING_WENT_WRONG_ERROR } = require('./errors')

exports.getAllUrls = (request, response) => {
  const visitorIP = request.headers['x-forwarded-for'] || request.ip
  let error = undefined

  if (request.query.error === TOO_MANY_ERROR.code) error = TOO_MANY_ERROR.message
  else if (request.query.error === URL_NOT_FOUND_ERROR.code) error = URL_NOT_FOUND_ERROR.message
  else if (request.query.error === SOMETHING_WENT_WRONG_ERROR.code) error = SOMETHING_WENT_WRONG_ERROR.message

  UrlModel
  .find({
    creatorIP: visitorIP
  })
  .then((urls) => {
    response.render('home', { urls, host: process.env.APP_URL, error })
  })
  .catch((error) => {
    response.redirect('/?error=something+went+wrong')
  })
}

exports.getUrl = (request, response) => {
  const visitorIP = request.headers['x-forwarded-for'] || request.ip

  UrlModel
  .findOne({
    shortUrl: request.params.url
  })
  .then((url) => {
    let isOwner = false
    if (url.creatorIP === visitorIP) isOwner = true

    response.render('url', { shortUrl: url.shortUrl, destinationUrl: url.destinationUrl, isOwner, host: process.env.APP_URL })
  })
  .catch((error) => {
    response.redirect(`/?error=${URL_NOT_FOUND_ERROR.code}`)
  })
}

exports.createUrl = (request, response) => {
  const visitorIP = request.headers['x-forwarded-for'] || request.ip
  const destinationUrl = request.body.url

  UrlModel
  .find({
    creatorIP: visitorIP
  })
  .then((urls) => {
    if (urls.length >= 3) {
      return response.redirect(`/?error=${TOO_MANY_ERROR.code}`)
    }

    UrlModel
    .create({
      destinationUrl,
      creatorIP: visitorIP
    })
    .then((url) => {
      response.redirect(`/${url.shortUrl}`)
    })
    .catch((error) => {
      response.redirect(`/?error=${SOMETHING_WENT_WRONG_ERROR.code}`)
    })
  })
}

exports.deleteUrl = (request, response) => {
  const visitorIP = request.headers['x-forwarded-for'] || request.ip

  UrlModel
  .findOne({
    shortUrl: request.params.url
  })
  .then((url) => {
    if (url.creatorIP !== visitorIP) {
      return response.redirect(`/?error=${SOMETHING_WENT_WRONG_ERROR.code}`)
    } else {
      UrlModel
      .deleteOne({ _id: url._id })
      .then(() => {
        return response.redirect('/')
      })
    }    
  })
  .catch((error) => {
    response.redirect(`/?error=${SOMETHING_WENT_WRONG_ERROR.code}`)
  })
}