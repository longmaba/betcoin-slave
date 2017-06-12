import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: String,
  count: Number
});

const boisSchema = mongoose.Schema({
  name: String,
  commended: Number,
  commendedBy: [userSchema]
});

const Bois = mongoose.model('Bois', boisSchema);

export default Bois;
