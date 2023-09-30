<br />
<p align="center">
  <h1 align="center">sidelog-client</h3>

  <p align="center">
    Easy logging for your side projects. This is a module to make using the <a href="https://github.com/JosiahSayers/sidelog">sidelog</a> API easier.
    <br />
    <a href="https://github.com/JosiahSayers/sidelog-client/issues">Report Bug</a>
    ·
    <a href="https://github.com/JosiahSayers/sidelog-client/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)



<!-- ABOUT THE PROJECT -->
## About The Project

I built sidelog out of the desire to have an easy to use, easy to consume, and cheap logging solution for my side projects. This client module will allow your javascript apps to easily communicate with your hosted sidelog instance.

### Built With

* [TypeScript](https://github.com/microsoft/TypeScript)
* [Axios](https://github.com/axios/axios)



## Getting Started

To get started with sidelog follow these simple steps.

### Prerequisites

* Have a running [sidelog](https://github.com/JosiahSayers/sidelog) instance

### Installation

```sh
npm i sidelog-client
```


## Usage

As soon as possible within your application you should call the `setConfig` method to get sidelog ready to roll.

```typescript
import logger from 'sidelog-client';

logger.setConfig({
  sidelogUrl: "https://sidelog.your-website.com", // Base URL of the API
  clientId: 'xxxxxxxxxxxxx', // client ID you set up in sidelog API
  logToConsole: true, // Defaults to false. If true, logs will be sent to the console
  logToApi: false, // Defaults to true. If true, logs will be sent to sidelog
});
```

After the config is set you can import sidelog into any file and use the log methods.

```typescript
  logger.info('User logged in with email', { email: 'test@test.com' });
```

You can also set a default meta that will be included in any future logs during this session.

```typescript
  logger.debug('before default meta'); // Output: before default meta
  logger.updateDefaultMeta(currentMeta => {
    return {
      ...currentMeta,
      userId: 12345,
    };
  });
  logger.debug('after default meta'); // Output: after default meta { userId: 12345 }
```

All of the logging functions return a promise that you can await if you need to be sure your log was successfully sent to the server.

```typescript
  const response = await logger.info('crucial log');
  if (!response.success) {
    // Log failed to send
    // There will be a message in your console with details
  }
```

## Roadmap

See the [open issues](https://github.com/JosiahSayers/sidelog/issues) for a list of proposed features (and known issues).



## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To contribute:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## License

[Distributed under the MIT License.](https://josiah-sayers.mit-license.org/)



## Contact

Josiah Sayers - josiah.sayers15+sidelog@gmail.com

Project Link: [https://github.com/JosiahSayers/sidelog-client](https://github.com/JosiahSayers/sidelog-client)

API Project Link: [https://github.com/JosiahSayers/sidelog](https://github.com/JosiahSayers/sidelog)
