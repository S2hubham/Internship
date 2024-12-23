const Url = require("../models/Url");
const validUrl = require("valid-url");
const shortid = require("shortid");
const {
    validateUrlStructure,
    isBlacklisted,
    validateUrlReachability,
} = require("../utils/validator");


exports.renderHomePage = async (req, res) => {
    try {
        res.render("index", {
            shortUrl: null,
            error: null,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.createShortUrl = async (req, res) => {
    const { originalUrl } = req.body;

    if (!validateUrlStructure(originalUrl)) {
        return res.render("index", {
            error: "Invalid URL format",
            shortUrl: null,
        });
    }

    if (isBlacklisted(originalUrl)) {
        return res.render("index", {
            error: "This URL is not allowed",
            shortUrl: null,
        });
    }

    const isReachable = await validateUrlReachability(originalUrl);
    if (!isReachable) {
        return res.render("index", {
            error: "This URL is not reachable",
            shortUrl: null,
        });
    }

    const existingUrl = await Url.findOne({ originalUrl });
    if (existingUrl) {
        return res.render("index", {
            shortUrl: `https://shubh.at/${existingUrl.shortUrl}`,
            actualLink: `http://localhost:5000/${existingUrl.shortUrl}`,
            error: null,
        });
    }

    const shortUrl = shortid.generate();
    const expiresAt = new Date(Date.now() + 10 * 1000); 

    try {
        const newUrl = new Url({
            originalUrl,
            shortUrl,
            expiresAt,
        });

        await newUrl.save();

        res.render("index", {
            shortUrl: `https://shubh.at/${shortUrl}`,
            actualLink: `http://localhost:5000/${shortUrl}`,
            error: null,
        });
    } catch (err) {
        console.error(err);
        res.render("index", {
            error: "Error creating short URL",
            shortUrl: null,
        });
    }
};

exports.redirectToOriginal = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const url = await Url.findOne({ shortUrl });

        if (!url) {
            return res.status(404).render("index", {
                error: "Short URL not found",
                shortUrl: null,
            });
        }

        if (url.expiresAt < new Date()) {
            return res.status(410).render("index", {
                error: "This link has expired",
                shortUrl: null,
            });
        }

        res.redirect(url.originalUrl);
    } catch (err) {
        console.error(err);
        res.status(500).render("index", {
            error: "Server Error",
            shortUrl: null,
        });
    }
};
