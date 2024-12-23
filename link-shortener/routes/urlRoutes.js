const express = require("express");
const router = express.Router();
const urlController = require("../controllers/urlController");


const validatePayload = (req, res, next) => {
    const { originalUrl } = req.body;
    if (!originalUrl) {
        return res.status(400).json({ error: "Original URL is required" });
    }
    next();
};


router.get("/", urlController.renderHomePage);


router.post("/api/urls", validatePayload, urlController.createShortUrl);


router.get("/:shortUrl", urlController.redirectToOriginal);

module.exports = router;
