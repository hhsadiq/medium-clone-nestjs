export const Prompts = {
  generateArticleTitle: (description, body) =>
    `Please generate a single, concise title for an article based on the following description and body content:\n\nDescription: ${description}\n\nBody: ${body}\n\nLimitation: Provide only one title, need plain text`,
};
