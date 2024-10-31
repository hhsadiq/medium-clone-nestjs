module.exports = [
  {
    type: 'input',
    name: 'version',
    message: 'Enter the API version for the new resource (e.g., "v1", "v2"):',
    required: true,
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
