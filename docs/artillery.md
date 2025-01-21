# Artillery Load Testing

## Table of Contents <!-- omit in toc -->

- [Artillery Load Testing](#artillery-load-testing)
  - [Installation](#installation)
  - [Setup](#setup)
  - [Overview of the Use-case](#overview-of-the-use-case)
  - [How to Run the File](#how-to-run-the-file)
  - [How to Increase the Load](#how-to-increase-the-load)

---

### Installation

To get started with Artillery, you need to install it using npm:

```bash
npm install -g artillery@latest
```

To verify the installation you need to run:

```bash
npx artillery dino
```

### Setup

- **motac-load-test.yml**: I created a file named `motac-load-test.yml` where the complete flow is added, covering user signup, login, and destination queries APIs.
- **helpers.js**: I created a helper file to generate unique phone numbers and email addresses for user signup on each request.

### Overview of the Use-case

This load testing setup simulates user interactions with the API, covering the APIs of the home-screen and discover Malaysia except the trip_listing API. The focus is on verifying API performance, request handling, and the ability to handle user sessions efficiently.

### How to Run the File

- Move to the directory where `motac-load-test.yml` and `helpers.js` exist:

  ```bash
  cd motac-mobile-apis
  ```

- Then run the load test using the following command:

  ```bash
  artillery run motac-load-test.yml
  ```

### How to Increase the Load

To scale the load, you can modify the configuration in the motac-load-test.yml file. The two key attributes that control the load are:

- duration: Specifies how long the load test should run. For example, 30 means 30 seconds.
- arrivalRate: Defines the rate at which virtual users arrive. For example, 1 means one virtual user arrives every second.
  By adjusting these values, you can control the intensity and duration of the load.

---

Previous: [Tests](tests.md)

Next: [Benchmarking](benchmarking.md)
