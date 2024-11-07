module.exports = [
  {
    type: 'input',
    name: 'name',
    message:
      "For which existing entity are you creating a new version? (e.g. 'User')",
    validate: (input) => {
      if (!input.trim()) {
        return 'Please provide the name of the entity you are versioning. This cannot be empty.';
      }
      return true;
    },
    format: (input) => input.trim(),
  },
  {
    type: 'input',
    name: 'version',
    message: 'Which version are you implementing? (e.g. v2, v3)',
    validate: (input) => {
      if (!input.trim()) {
        return 'Version is required. Please specify the version (e.g., v2).';
      }
      return true;
    },
    format: (input) => input.trim(),
  },
  {
    type: 'confirm',
    name: 'isAddTestCase',
    message: 'Do you want to add test cases and mock data?',
    initial: true,
  },
  {
    type: 'multiselect',
    name: 'functionalities',
    message: 'Select the functionalities you want to include:',
    choices: [
      { name: 'create', value: 'create' },
      { name: 'findAll', value: 'findAll' },
      { name: 'findOne', value: 'findOne' },
      { name: 'update', value: 'update' },
      { name: 'delete', value: 'delete' },
    ],
  },
];
