module.exports = [
  {
    type: 'input',
    name: 'version',
    message:
      'Enter the API version for the resource in which you want to create query (e.g. "v1", "v2"):',
    required: true,
  },
  {
    type: 'input',
    name: 'entity',
    message: "Entity (e.g. 'Article')",
    validate: (input) => {
      if (!input.trim()) {
        return 'Entity name is required';
      }
      return true;
    },
    format: (input) => input.trim(),
  },
  {
    type: 'input',
    name: 'name',
    message: "Name (e.g. 'ListingQuery')",
    validate: (input) => {
      if (!input.trim()) {
        return 'Name is required';
      }
      return true;
    },
    format: (input) => input.trim(),
  },
];
