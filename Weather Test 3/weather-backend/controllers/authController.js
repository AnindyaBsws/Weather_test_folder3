import User from '../models/User.js';

export const signup = async (req, res) => {
  const { email, mobile, password } = req.body;
  console.log(email, mobile, password);

  try {
    const newUser = new User({
      username: email,
      email,
      mobile,
      online: true
    });

    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, err => {
      res.json(err);
    });
    
    res.json({ message: 'Sign up successful', user: { username: newUser.username, _id: newUser._id, __v: newUser.__v, online: newUser.online } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const details = await User.findByUsername(req.body.username);
  res.json({ message: 'Login successful', user: { username: details.username, _id: details._id, __v: details.__v, online: details.online } });
};

export const logout = async (req, res) => {
  req.logout(err => {
    if(err) {
        res.json(err);
    }
  });

  res.json({ message: 'Log out successful' });
};
