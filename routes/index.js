
const path = require('path');
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');

// Página inicial
router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

router.get('/qrcodes', express.static(path.join(__dirname, '../qrcodes')));

// Página de Line Up
router.get('/lineup', (req, res) => {
  res.render('lineup', { user: req.user });
});

// Página de Ingressos
router.get('/tickets', (req, res) => {
  res.render('tickets', { user: req.user });
});


router.get('/tickets/buy', (req, res) => {
  res.render('tickets-buy', { user: req.user });
});

// Página de Perfil (Autenticado)
router.get('/profile', ensureAuthenticated, (req, res) => {
  res.render('tickets', { user: req.user });
});

module.exports = router;
