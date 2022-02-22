[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

**WARNING: this library is still under heavy construction**

# About

hue.js is a node module that allows you to interaction with the hue API.

- Object-oriented
- 100%-coverage of the hue API (still work in progress)

# Installation (Not available yet!)

**NodeJS v16.13.0 or newer is required**

```shell
npm install hue.js
```

# Example usage

```js
const { Bridge } = require('hue.js');

const bridge = new Bridge({
  ip: 'some-ip',
  applicationKey: 'some-application-key',
});

bridge.on('ready', async () => {
  console.log('Ready!');

  const room = await bridge.rooms.cache.get('some-id');

  await room.applyScene('Default', { transition: 3000 });
});

bridge.on('lightUpdate', (light) => console.log('lightUpdate', light.name));
```

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge

[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge

[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members

[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge

[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers

[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge

[issues-url]: https://github.com/othneildrew/Best-README-Template/issues

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge

[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
