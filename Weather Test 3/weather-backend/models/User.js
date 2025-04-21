import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  mobile: String,
  password: String,
  online: Boolean
});

const User = mongoose.model('User', userSchema);
export default User;
