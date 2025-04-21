import User from '../models/User.js';

export const login = async (req, res) => {
  const { email, mobile, password } = req.body;

  try {
    const user = await User.findOne({ $or: [{ email }, { mobile }] });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    user.online = true;
    await user.save();

    res.json({ message: 'Login successful', id: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const logout = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findById(id);
    if (user) {
      user.online = false;
      await user.save();
    }

    res.json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
