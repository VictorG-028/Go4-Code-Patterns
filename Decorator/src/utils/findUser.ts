import User from "../interfaces/User";
import users from "../database/fakeDatabase";

async function findUserByEmail(email: string): Promise<User> {

  // const databaseService = FakeDatabase.getInstance();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(user => user.email === email);
      if (user) {
        resolve(user);
      } else {
        reject('User not found');
      }
    }, 1000);
  });


}

export default findUserByEmail;
