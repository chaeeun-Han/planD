const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        try {
            const exUser = await User.findOne({
                where: { id: profile.id, provider: 'kakao' },
            });
            if (exUser) {
                done(null, exUser);
            } else {
                const birth = profile._json.kakao_account.birthday;
                const month = birth.slice(0,2);
                const date = birth.slice(2);
                var genkor = "성별";
                if (profile._json.kakao_account.gender == "female")
                    genkor = "여자";
                else
                    genkor = "남자";

                const newUser = await User.create({
                    email: profile._json.kakao_account.email,
                    name: profile.displayName,
                    // id: profile.id,
                    provider: 'kakao',
                    birthday: `${month}-${date}`,
                    gender: genkor,
                    password: "kakao-password"
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};