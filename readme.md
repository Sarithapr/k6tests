# k6tests

This repository contains performance and load testing scripts using [k6](https://k6.io/). k6 is an open-source tool for API, microservices, and website testing.

## Prerequisites

- Install [k6](https://k6.io/docs/getting-started/installation/) on your machine.

## Getting Started

Clone the repository:

```sh
git clone https://github.com/Sarithapr/k6tests.git
cd k6tests
```

## Running k6 Tests

### Headless Mode 

Headless mode runs tests from the command line and outputs results to the console.

```sh
k6 run <script.js>
```

## Useful k6 Commands

- Run test (headless):  
  `k6 run script.js`
- Run with custom options:  
  `k6 run --vus 20 --duration 1m script.js`
- Run with custom options:  
  `K6_BROWSER_HEADLESS=false k6 run browser-script.js`

## Resources

- [k6 Documentation](https://k6.io/docs/)
- [k6 Examples](https://github.com/k6io/k6-examples)




