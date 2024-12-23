import bcrypt from 'bcrypt';
import generateAccessToken from '../utils/accessToken.js';
import generateRefreshToken from '../utils/refreshToken.js';
import User from '../models/User.js';

class authController {
  async registration(req, res) {
    try {
      const { email, password, avatar } = req.body;

      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }

      const hashPassword = await bcrypt.hash(password, 7);

      const user = await User.create({
        email,
        password: hashPassword,
        avatar,
      });

      return res.status(201).json({ message: 'User was created', user });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: 'No user with this email' });
      }

      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return res.json({ accessToken, refreshToken });
      } else {
        return res.status(401).json({ message: 'Incorrect password' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  }
}

export default new authController();
