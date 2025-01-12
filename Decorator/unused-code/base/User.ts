
class User {
  email: string;
  password: string;
  permissions: string[];

  constructor(email: string, password: string, permissions?: string[]) {
    this.email = email;
    this.password = password;
    this.permissions = permissions || [];
  }

  public serialize(): string {
    return JSON.stringify({
      ...this,
    });
  }

  public static fromJSON(json: string): User {
    const obj: User = JSON.parse(json);
    const user = Object.create(User.prototype);
    return Object.assign(user, obj);
  }
}

export default User;
