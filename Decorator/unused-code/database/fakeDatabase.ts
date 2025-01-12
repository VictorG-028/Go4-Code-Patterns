import User from "../base/User";


const user = new User("secret@gmail.com", "$2a$10$dy1m81s0p1GMylZVi7W6D.OfvS4MPxUzJuYBo8AJboiyPhATfPpGu");

const users: User[] = [user];

export default users;

// class FakeDatabase {

//   // singleton
//   private static _instance: FakeDatabase = new FakeDatabase();

//   private constructor() {
//   }

//   public static getInstance() {
//     return this._instance || (this._instance = new this());
//   }

//   public getUsers() {
//     return users;
//   }

// }

