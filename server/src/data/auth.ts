import { faker } from "@faker-js/faker";

function createRandomUsers() {
  return {
    email: faker.internet.email(),
    password: "Test@123",
    status: faker.helpers.arrayElement(["user", "admin"]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
}

export default faker.helpers.multiple(createRandomUsers, { count: 5 });
