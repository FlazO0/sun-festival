// routes/auth.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;

const uuid = require('uuid');
// Função para ler e escrever dados em arquivos JSON
function readJSONFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON file:', err);
    return null;
  }
}

function writeJSONFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing JSON file:', err);
  }
}

// Configuração da estratégia local de autenticação
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  const users = readJSONFile(path.join(__dirname, '..', 'users.json')).users;
  const user = users.find(u => u.email === email);

  if (!user) {
    return done(null, false, { message: 'No user with that email' });
  }

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) throw err;
    if (isMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Password incorrect' });
    }
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const users = readJSONFile(path.join(__dirname, '..', 'users.json')).users;
  const user = users.find(u => u.id === id);
  done(null, user);
});


// Rota para exibir o formulário de registro
router.get('/register', (req, res) => res.render('register'));

// Rota para lidar com o registro de usuários
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const usersFilePath = path.join(__dirname, '..', 'users.json');
  const users = readJSONFile(usersFilePath).users;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: uuid.v4(), name, email, password: hashedPassword };
  users.push(newUser);
  writeJSONFile(usersFilePath, { users });
  res.redirect('/auth/login');
});

// Rota para exibir o formulário de login
router.get('/login', (req, res) => res.render('login'));

// Rota para lidar com o login de usuários
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

// Rota para fazer logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
