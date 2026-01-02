// randomdatagenerator.ts
import { faker } from '@faker-js/faker';

export class RandomDataGenerator {

  /* -------------------- BASIC -------------------- */

  static getUUID(): string {
    return faker.string.uuid();
  }

  static getRandomNumber(min = 0, max = 9999): number {
    return faker.number.int({ min, max });
  }

  static getRandomAlpha(length = 8): string {
    return faker.string.alpha({ length });
  }

  static getRandomAlphaNumeric(length = 10): string {
    return faker.string.alphanumeric({ length });
  }

  /* -------------------- USER -------------------- */

  static getFirstName(): string {
    return faker.person.firstName();
  }

  static getLastName(): string {
    return faker.person.lastName();
  }

  static getFullName(): string {
    return faker.person.fullName();
  }

  static getUsername(): string {
    return faker.internet.username();
  }

  static getEmail(domain = 'example.com'): string {
    return faker.internet.email({ provider: domain });
  }

  static getPassword(length = 12): string {
    return faker.internet.password({ length });
  }

  static getPhoneNumber(): string {
    return faker.phone.number();
  }

  /* -------------------- ADDRESS -------------------- */

  static getStreetAddress(): string {
    return faker.location.streetAddress();
  }

  static getCity(): string {
    return faker.location.city();
  }

  static getState(): string {
    return faker.location.state();
  }

  static getZipCode(): string {
    return faker.location.zipCode();
  }

  static getCountry(): string {
    return faker.location.country();
  }

  /* -------------------- DATE & TIME -------------------- */

  static getPastDate(years = 5): string {
    return faker.date.past({ years }).toISOString().split('T')[0];
  }

  static getFutureDate(years = 1): string {
    return faker.date.future({ years }).toISOString().split('T')[0];
  }

  static getRecentDate(days = 10): string {
    return faker.date.recent({ days }).toISOString();
  }

  /* -------------------- COMPANY -------------------- */

  static getCompanyName(): string {
    return faker.company.name();
  }

  static getJobTitle(): string {
    return faker.person.jobTitle();
  }

  /* -------------------- PAYMENT (FAKE) -------------------- */

  static getCreditCardNumber(): string {
    return faker.finance.creditCardNumber();
  }

  static getCreditCardCVV(): string {
    return faker.finance.creditCardCVV();
  }

  static getcreditCardIssuer(): string {
    return faker.finance.creditCardIssuer();
  }

  static getIBAN(): string {
    return faker.finance.iban();
  }

  /* -------------------- INTERNET -------------------- */

  static getURL(): string {
    return faker.internet.url();
  }

  static getIPAddress(): string {
    return faker.internet.ip();
  }

  static getMacAddress(): string {
    return faker.internet.mac();
  }

  /* -------------------- BOOLEAN & ARRAYS -------------------- */

  static getBoolean(): boolean {
    return faker.datatype.boolean();
  }

  static getRandomFromArray<T>(values: T[]): T {
    return faker.helpers.arrayElement(values);
  }
}
