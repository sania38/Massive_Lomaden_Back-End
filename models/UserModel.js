// models/userModel.js
const users = [];

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

module.exports = {
  users,
  User,
};
