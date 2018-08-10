const TOO_MANY_ERROR = {
  code: 'too many',
  message: `You've already reached maximum numbers of shortened URLs (3 URLs).`
}

const URL_NOT_FOUND_ERROR = {
  code: 'url not found',
  message: `The URL you wanted to see doesn't exist. Better luck next time!`
}

const SOMETHING_WENT_WRONG_ERROR = {
  code: 'something went wrong',
  message: `Something-Who-Must-Not-Be-Named happened. Please contact Headmaster Dumbledore!`
}

module.exports = {
  TOO_MANY_ERROR,
  URL_NOT_FOUND_ERROR,
  SOMETHING_WENT_WRONG_ERROR
}