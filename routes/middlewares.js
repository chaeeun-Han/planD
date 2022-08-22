/*
    로그인한 사용자가 회원가입과 로그인 라우터에 접근하지 않도록.
    로그인하지 않은 사용자가 로그아웃 라우터에 접근하지 않도록.
    라우터에 접근 권한을 제어하는 미들웨어
*/

exports.isLoggedIn = (req, res, next ) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인이 필요합니다.');
    }
};

exports.isNotLoggedIn = (req, res, next ) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect('/?error=' + message);
    }
};