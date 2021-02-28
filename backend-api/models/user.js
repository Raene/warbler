var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  message: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  ]
});

userSchema.pre("save", function(next) {
  var user = this;

  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    console.log(user.password);
    next();
  });
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    console.log(this.password);
    console.log(candidatePassword);
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log(this.password);
    console.log(isMatch);
    return isMatch;
  } catch (err) {
    return err;
  }
};

var User = mongoose.model("User", userSchema);

module.exports = User;
