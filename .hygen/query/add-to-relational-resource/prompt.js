module.exports = [
  {
    type: 'input',
    name: 'version',
    message:
      'Enter the API version of resource in which you want to insert property (e.g. "v1", "v2"):',
    validate: (version) => {
      if (!version.trim()) {
        return 'API version is required';
      }
      return true;
    },
    format: (version) => version.trim(),
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
