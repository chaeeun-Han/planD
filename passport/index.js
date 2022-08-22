const passport = require('passport');
const local = require('./localStrategy');   // 로컬 로그인 시 동작을 위한 파일
const kakao = require('./kakaoStrategy');   // 카카오 로그인 시 동작을 위한 파일
const User = require('../models/user');

module.exports = () => {
    // 로그인 시에만 실행, 사용자 정보 객체를 세션에 아이디로 저장.
    passport.serializeUser((user, done) => {
        done(null, user.id);        // done(에러 발생 시 사용, 저장하고 싶은 데이터)
    });

    // 매 요청 시 실행, 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러옴.
    // serializeUser에서 받아온 user.id를 매개변수로 지정
    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id }})          // 받아온 id에 일치하는 user을 조회해서 정보 취득
            .then(user => done(null, user))     // req.user에 사용자 정보를 저장
            .catch(err => done(err));
    });

    local();
    kakao();
};