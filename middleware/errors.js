module.exports = function (app) {

    // 404s
    app.use(function (req, res, next) {
        if (req.accepts('html')) {
            return res.status(404).send("<h1>Page not found: 404</h1>");
        }

        if (req.accepts('json')) {
            return res.status(404).json({ error: 'Page not found: 404' });
        }

        // default response type
        res.status(404).send("Page not found: 404");
    })

    // 500
    // difference between 404 and 500: note the err object in the callback
    app.use((err, req, res, next) => {
        console.error('error at %s\n', req.url, err.stack);
        res.status(500).send("Server error: 500");
    })
}
