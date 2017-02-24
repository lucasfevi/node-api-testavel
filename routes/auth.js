import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

export default (app) => {
  const config = app.config;
  const Users = app.datasource.models.Users;

  app.post('/token', (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.sendStatus(HttpStatus.UNAUTHORIZED);
    }

    const email = req.body.email;
    const password = req.body.password;

    return Users.findOne({ where: { email } })
      .then((user) => {
        if (!Users.isPassword(user.password, password)) {
          return res.sendStatus(HttpStatus.UNAUTHORIZED);
        }

        const payload = { id: user.id };

        return res.json({
          token: jwt.encode(payload, config.jwtSecret),
        });
      })
      .catch(() => res.sendStatus(HttpStatus.UNAUTHORIZED));
  });
};
