const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  let featureX = await req.ldClient.variation('enable-feature-x', req.ldContext, false);

  // console.log('Context', req.ldContext);
  // console.log('Cookies', req.cookies);

  res.render('index', { 
    title: 'My lovely app',
    enable_feature_x: featureX
  });
});

module.exports = router;
