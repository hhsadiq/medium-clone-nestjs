# Command Line Interface (CLI)

---

## Table of Contents <!-- omit in toc -->

- [Command Line Interface (CLI)](#command-line-interface-cli)
  - [Generate resource](#generate-resource)
    - [For relational database (PostgreSQL + TypeORM)](#for-relational-database-postgresql--typeorm)
    - [Property for relational database (PostgreSQL + TypeORM)](#property-for-relational-database-postgresql--typeorm)
    - [Generate a basic structure for raw queries](#generate-a-basic-structure-for-raw-queries)
    - [Generate a Version of a Resource](#generate-a-version-of-a-resource)
  - [FAQ](#faq)
    - [Error: Unable to connect to the newly created relational entity](#error-unable-to-connect-to-the-newly-created-relational-entity)
    - [Can I create foreign key properties using the add:property command?](#can-i-create-foreign-key-properties-using-the-addproperty-command)

---

## Generate resource

Generate resource with the following commands:

### For relational database (PostgreSQL + TypeORM)

```bash
npm run generate:resource -- ResourceName
```

Example:

```bash
npm run generate:resource -- Category
```

This command will trigger a terminal prompt with the following options:

1. **Functionality Selection**: You can choose which functionalities (CRUD operations) you want to generate for the resource. The available functionalities are:

   - Create
   - Find All
   - Find One
   - Update
   - Delete

   Use the arrow keys to navigate and the spacebar to select multiple options. Press Enter key to move to next step.

2. **Add Test Case**: You will be prompted with a confirmation question:

   - "Do you want to add test cases and mock data?"

   If you choose "Yes", test case structure and mock data for the resource will also be generated along with the selected functionalities.

### Property for relational database (PostgreSQL + TypeORM)

```bash
npm run add:property
```

This command will initiate a terminal prompt to help you add a new property to an entity in a relational database. The prompt follows these steps:

1. **Entity name**: You will be asked to enter the name of the entity (e.g., 'User') for which you want to add the property. This field is required, and the input will be validated to ensure it's not empty.

2. **Property name**: You will be asked to provide the property name in snake case (e.g., 'first_name'). This field is also required, and the input will be validated to ensure it's not empty.

3. **Is this property optional?:** You will be prompted with a confirmation asking whether the property is optional. If you select "Yes", the property will be marked as optional in the schema.

4. **Type of the property**: You will be asked to choose a data type for the default property from the following list:

   1. varchar
   2. text
   3. uuid
   4. int
   5. float
   6. double
   7. decimal
   8. boolean
   9. timestamp
   10. date
   11. json
   12. custom **(If you choose custom, you will be prompted to manually enter the custom type.)**

5. **Add to DTO?**: You will be prompted with another confirmation asking whether the property should be added to the DTO (Data Transfer Object). If you select "Yes", the system will include the new property in the DTO.

6. **Property Example**: You will be asked to provide the property example(eg:test@gmail.com). This field is also required, and the input will be validated to ensure it's not empty.

After the property is created, please check the DTO files and add the relevant imports. Otherwise, the file will have errors.

### Generate a basic structure for raw queries

```bash
npm run generate:query
```

This command will initiate a terminal prompt to guide you in generating a raw query for the desired entity. The prompt includes the following questions:

1. **Entity**: You will be asked to provide the entity name (e.g., 'Article') for which the query is being created. This field is required, and the system will validate that the input is not empty.

2. **Name**: You will be asked to provide a name for the query (e.g., 'ListingQuery'). This name is also required, and validation ensures that it is not empty.

Once you complete the prompt, the necessary query files will be generated, ready for customization as needed.

### Generate a Version of a Resource

```bash
npm run generate:version
```

This command helps you create a new version of an existing resource by generating a folder and files with the version number reflected in both the filenames and class names. For example, if you are versioning the `User` resource and selecting `v2`, a `v2` folder will be created within the resource directory. The filenames, class names, and related code will reflect this new version (class_name: `UserV2`, file_name `user.v2.controller.ts`, etc.).

After you create a new version, the CLI will copy directories such as domains, entities, and mappers from the previous version of the resource to the new version's directory. All files within these directories, including the main module file and any dependent files (e.g., `user.ts`, `user-follow.ts`), will have their filenames and class names updated to reflect the new version number (e.g., `user.v2.ts`, `user-follow.v2.ts`, `UserV2`, `UserFollowV2`).

This is useful when you want to extend or modify the resource functionality without affecting the original version.

**Note**: Be aware that changing filenames and class names in the domains, entities, and mappers directories may lead to import and class name errors in your code in the newer version, as code in the files may still reference the previous version. Check each file and update imports and references to match the new version accordingly.

You will be prompted with the following questions:

1. **For which existing entity are you creating a new version? (e.g. 'User')**  
   This prompt will ask you to specify the existing entity or resource you are versioning. The entity name must be entered (e.g., 'User').

2. **Which version are you implementing? (e.g. v2, v3)**  
   Here, you will provide the version number for the new version of the resource you are creating (e.g., `v2`, `v3`). This version number will be reflected in both the folder structure and the file/class names.

3. **Do you want to add test cases and mock data?**  
   This confirmation will ask whether you would like to generate test cases and mock data along with the resource. If you choose "Yes," test cases and mock data will be generated as part of the new version of the resource.

4. **Select the functionalities you want to include:**  
   You will be asked to select the functionalities (CRUD operations) to include in the new version of the resource. The available options are:

   - Create
   - Find All
   - Find One
   - Update
   - Delete

   Use the arrow keys to navigate and the spacebar to select multiple options. Press the Enter key to move to the next step.

## FAQ

### Error: Unable to connect to the newly created relational entity

When working with the start:dev script and the compiler is watching for changes, it may sometimes fail to compile newly generated resource files to JavaScript. An easy fix for this issue is to run the following command:

```bash
rm -rf ./dist
```

```bash
npm run build
```

And then you can use the start:dev or other command which you were using.

### Can I create foreign key properties using the add:property command?

Technically, yes and no. While you can generate a simple property without any relations using the `add:property` command, you will need to manually handle the foreign key relations. This includes writing the relation yourself, adding the relevant validation checks in the DTO, and updating other relevant pieces of code. Essentially, most of the work for handling foreign key relations will need to be done manually.

---

Previous: [Architecture](architecture.md)

Next: [Working with database](database.md)
