const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const tagsRoute = require('./tags.route');
const batchesRoute = require('./batches.route');
const dtcmRoute = require('./dtcm.route');

const registrationRoute = require('./registration.route')
const eventsairRoute = require('./eventsair.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/eventsair',
    route: eventsairRoute,
  },
  {
    path: '/tags',
    route: tagsRoute,
  },
  {
    path: '/registration',
    route: registrationRoute,
  },
  {
    path:'/batches',
    route: batchesRoute,
  },
  {
    path:'/dtcm',
    route: dtcmRoute,
  }

];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
