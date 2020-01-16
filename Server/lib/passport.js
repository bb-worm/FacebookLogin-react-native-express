module.exports = app => {
  const passport = require('passport'),
    FacebookTokenStrategy = require('passport-facebook-token');

  app.use(passport.initialize());
  app.use(passport.session());

  const fbConfig = require('../config/facebook');

  passport.serializeUser((user, done) => {
    done(null, user.id); // user.id를 session에 저장 -> deserialize에 사용됨
  });

  passport.deserializeUser((id, done) => {
    db.query(
      `SELECT id, name, birth_date, email, interest_category, photo_path, push_deadline, push_board, push_chat, create_datetime FROM author WHERE id=${id}`,
      (err, results) => {
        if (err) {
          throw err;
        }
        done(null, results[0]); // request.user에 저장되어, 사용자 정보 필요 시 사용 가능
      },
    );
  });

  passport.use(
    new FacebookTokenStrategy(
      fbConfig,
      (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        done(null, profile);
      },
      (err, user) => {
        return done(error, user);
      },
    ),
  );

  // /auth/facebook/token?access_token= 으로 요청하면 실행됨
  app.get(
    '/auth/facebook/token',
    passport.authenticate('facebook-token', {
      successRedirect: '/',
      failureRedirect: '/',
    }),
  );
};
