import { faker } from '@faker-js/faker';

export const fakeGenerator = {
  generateParagraph: (): string => faker.lorem.paragraph(),
  generateSentence: (): string => faker.lorem.sentence(),
  generateWords: (count: number = 3): string => faker.lorem.words(count),
  generateTagList: (): string[] => [faker.word.noun(), faker.word.adjective()],
  generateFirstName: (): string => faker.person.firstName(),
  generateLastName: (): string => faker.person.lastName(),
  generateEmail: (): string => faker.internet.email().toLocaleLowerCase(),
  generatePassword: (length: number = 12): string => {
    return faker.internet.password({ length });
  },
};
