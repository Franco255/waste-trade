const express = require('express');
const router = express.Router();

router.get('/:name', (req, res) => {
    const {name} = req.params;
    res.render('businessDashboard.ejs', {query: name});
})

module.exports = router