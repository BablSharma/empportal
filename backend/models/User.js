class User {
  constructor(username, email, password, role) {
    this.id = Date.now().toString();  // simple unique id
    this.username = username;
    this.email = email;
    this.password = password;  // hashed password
    this.role = role;          // 'hr' or 'employee'
  }
}

export default User;
