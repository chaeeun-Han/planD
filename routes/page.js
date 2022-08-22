const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// 템플릿 엔진에서 사용할 user 변수 설정
router.use((req, res, next) => {
    res.locals.user = req.user;
    next(); 
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { title: '내 정보'});
});

router.get('/report', isLoggedIn, (req, res) => {
    res.render('report', {title: '레포트'});
});

router.get('/join', (req, res) => {
    res.render('join', {title: '회원가입'});
});

router.get('/login', (req, res) => {
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