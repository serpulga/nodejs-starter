import chance from "chance";
import * as users from "./users";

// generate a random user
const toUser = () => ({
  email: chance,
  password: chance,
  name: chance,
});

test("should be able to add a user", async () => {
  const user = toUser();
  const result = await users.add(user);
});

// test("users.find()", () => {

// })

// test("users.getById()", () => {

// })

// test("users.getByEmail()", () => {

// })

// test("users.getBy()", () => {

// })

// test("users.update()", () => {

// })

// test("users.updateBy()", () => {

// })

// test("users.remove()", () => {

// })

// test("users.removeBy()", () => {

// })
