class User {
  constructor({ id, name, profission, age }) {
    this.id = parseInt(id);
    this.name = name;
    this.profission = profission;
    this.age = parseInt(age);
  }
}

module.exports = User;
