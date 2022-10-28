// grab our db client connection to use with our adapters
const client = require("../client");
const bcrypt = require("bcrypt");

module.exports = {
  // add your database adapter fns here
//   getUsers,
  createUser,
  getUser,
};

async function getUser({ username }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT *
        FROM users
        WHERE "userName"=$1;
      `,
      [username]
    );
    console.log("user inside getUser func in DB", user.userName);
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function createUser({
  username,
  password,
  email
}) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const {
      rows: [newUser],
    } = await client.query(
      `
        INSERT INTO users("userName", "hashedPassword", email)
        VALUES($1, $2, $3)
        RETURNING *;
    `,
      [username, hashedPassword, email]
    );
  
    return newUser;
  } catch (error) {
    console.log(error);
  }
  
}