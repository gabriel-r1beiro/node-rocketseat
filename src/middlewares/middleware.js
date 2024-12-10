function middleware (req, res, next) {
    console.log("Passei no 'MIDDLEWARE'!")
    return next()
};

export default middleware;