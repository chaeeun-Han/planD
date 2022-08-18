const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// 사용자 이름, 아이디, 비밀번호 요청 및 응답
router.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.name = null;
    res.locals.id = null;
    res.locals.password = null;
    next(); 
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { title: '내 정보'});
});

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', {title: '회원가입'});
});

router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('login', {title: '로그인'});
});

router.get('/', (req, res, next) => {
    const twits = [];
    res.render('index', {
        title: 'planD',
        twits,
    });
});

module.exports = router;