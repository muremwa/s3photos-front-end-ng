const PROXY_CONFIG = [
    {
        context: [
            "/photos/",
            "/media/"
        ],
        target: "http://127.0.0.1:8000",
        secure: false
    }
]

module.exports = PROXY_CONFIG;
