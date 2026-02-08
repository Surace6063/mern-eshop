const asyncHandler = (fn) => (req, res, next) => {
  // Wrap the async function in Promise.resolve() to handle both
  // async/await errors and rejected Promises
  Promise.resolve(fn(req, res, next))
    // If an error occurs, catch it and pass it to the next middleware
    // This will be your global error handler
    .catch(next)
}

export default asyncHandler
