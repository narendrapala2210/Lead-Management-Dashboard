import { faker } from "@faker-js/faker";

function createRandomLeads() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    company: faker.company.name(),
    status: faker.helpers.arrayElement([
      "New",
      "Contacted",
      "Qualified",
      "Converted",
      "Lost",
    ]),
    source: faker.helpers.arrayElement([
      "Website",
      "Referral",
      "Ads",
      "Cold Call",
    ]),
  };
}

export default faker.helpers.multiple(createRandomLeads, { count: 500 });
