[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

**WARNING: this library is still under heavy construction**

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#About">About</a>
    </li>
    <li>
      <a href="#example-usage">Example usage</a>
    </li>
    <li>
      <a href="#installation">Installation</a>
    </li>
    <li>
      <a href="#docs">Docs</a>
    </li>
    <li>
      <a href="#guides">Guides</a>
    </li>
    <li>
      <a href="#roadmap">Roadmap</a>
    </li>
  </ol>
</details>

# About

hue.ts is a node module that allows you to easily interact with the hue API (V2).

- Object-oriented
- Written in TypeScript
- Future 100%-coverage of the hue API

# Docs

Docs can be found on our wiki [here][wiki-url].

# Example usage

```js
const { Bridge, ApiResourceType } = require('hue.ts');

const bridge = new Bridge({
   connection: {
      ip: 'some-ip',
      applicationKey: 'some-key',  
   },
});

bridge.on('ready', async () => {
   console.log('Ready!');

   const scene = bridge.resources.getByName('Best Scene Ever', {
      type: ApiResourceType.Scene,
      force: true,
   });

   await scene.recall({ duration: 5000 });
});

bridge.connect();
```

# Installation

> ⚠️ **Hue bridge version 1948086000 or newer is required**: You can find your bridge's version in
the hue app, Settings -> My Hue system -> Select your bridge -> Software

```shell
npm install hue.ts
```

# Guides

## Connecting to a bridge

```ts
import { Bridge } from 'hue.ts';

const bridge = new Bridge({
   connection: {
      ip: 'some-ip',
      applicationKey: 'some-key',  
   },
});
```

The **some-ip** can be found in the Hue app at Settings -> My hue system -> Select your bridge -> IP

You can get **some-key** by following the steps below:

1. Open your browser and go to `https://<bridge ip address>/debug/clip.html`
2. Next fill in the options below:
   URL: /api
   BODY: {"devicetype":"some-random-name"}
3. Press the POST button
4. Go click the button on your Hue bridge
5. Press the POST button again
6. You should now see something like `{ success: { username: 'some-key' } }`

For more information on retrieving this key visit: https://developers.meethue.com/develop/hue-api-v2/getting-started/

Finally, connect to your bridge by calling `bridge.connect()`.

After the bridge has successfully connected and cached all resources the **ready** event is emitted. You can also listen to other events which can be found [here](https://github.com/S222em/hue.ts/wiki/BridgeEvents).

```ts
import { Bridge, Events } from 'hue.ts';

const bridge = new Bridge({
   connection: {
      ip: 'some-ip',
      applicationKey: 'some-key',
   },
});

bridge.on(Events.Ready, () => {
	// Do stuff
});

bridge.connect();
```

### Connecting via Cloud2Cloud

> ⚠️ **It is not advised to use Cloud2Cloud at this time**

```ts
const bridge = new Bridge({
   connection: {
      accessToken: 'some-token',
      applicationKey: 'some-key',  
   },
});
```

To find the **accessToken** and **applicationKey** visit https://developers.meethue.com/develop/hue-api-v2/cloud2cloud-getting-started/

## Resources

All the resources belonging to the connect bridge are cached after calling `bridge.connect()`.
You can access resources in the cache with the following methods.

Can be used to find a resource by its unique ID.
```ts
const resource = bridge.resources.getById('some-id');
```

Can be used to find a resource by its identifier, similar to an ID, but an identifier also includes the type of the resource.
```ts
const resource = bridge.resources.getByIdentifier({
   rid: 'some-id',
   rtype: 'some-type',
});
```

Find multiple resources by identifier.
```ts
const resource = bridge.resources.getByIdentifiers([
   {
       rid: 'some-id', rtype: 'some-type',
   },
   {
       rid: 'some-id', rtype: 'some-type',
   }
]);
```

> ⚠️ **.getByName will return the first occurrence**

Find a resource by its name.
```ts
const resource = bridge.resources.getByName('some-name');
```

These methods include additional options as second parameter:
- **force**, if true, error is thrown if resource does not exist.
- **type**, the type of the resource, will not return resources of other types.

Here is an example:
```ts
const resource = bridge.resources.getById('some-id', {
    type: ApiResourceType.Light,
    force: true,
});
```

## Lights

### On/Off

```ts
light.isOn();

await light.off();
await light.on();
await light.toggle();
await light.edit({
   on: true,
});
```

### Brightness

```ts
// Number between 1%-100%
light.brightness

await light.setBrightness(50);
await light.edit({
   brightness: 50,
});
```

### Color temperature

```ts
// Number between 153-500
light.mirek

await light.setMirek(300);
await light.edit({
   mirek: 300,
});
```

### Color

> ⚠️ **Given color is always transpiled to the closest point in the lights display range**

```ts
// Number between 153-500
light.xy

await light.setXy({
   x: 0.3,
   y: 0.5,
})
await light.edit({
   xy: {
      x: 0.3,
      y: 0.5,
   },
});
```

To convert hex or rgb to a xy value the following utility functions can be used:
```ts
const xy = fromHex('#e62d20');
const hex = toHex(xy);

await light.setXy(fromHex('#e62d20'));
```
```ts
const xy = fromRGB({
   red: 230,
   green: 45,
   blue: 32,
});
const rgb = toRGB(xy);

await light.setXy(fromRGB({
   red: 230,
   green: 45,
   blue: 32,
}));
```

### Type Guards

Not all lights support color or color temperature. To make sure a light supports these, type guards are available

```ts
light.isCapableOfDimming()
light.isCapableOfMirek()
light.isCapableOfXy()
light.isCapableOfXys()
```

## Other resources

Not all resources are currently supported. Although most important ones are. Guides on these resources will be added later. For now reference to [documentation](https://github.com/S222em/hue.ts/wiki).
For further assistance, feel free to open up an issue on our GitHub.

# Roadmap

This library is still a work in progress, and I plan to add support for all API features, currently focusing on the structure of the library itself. The Hue API V2 is currently
not in a finished state yet, so many features **can't** be implemented yet.

[contributors-shield]: https://img.shields.io/github/contributors/S222em/hue.js.svg?style=for-the-badge
[contributors-url]: https://github.com/S222em/hue.js/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/S222em/hue.js.svg?style=for-the-badge
[forks-url]: https://github.com/S222em/hue.js/network/members
[stars-shield]: https://img.shields.io/github/stars/S222em/hue.js.svg?style=for-the-badge
[stars-url]: https://github.com/S222em/hue.js/stargazers
[issues-shield]: https://img.shields.io/github/issues/S222em/hue.js.svg?style=for-the-badge
[issues-url]: https://github.com/S222em/hue.js/issues
[license-shield]: https://img.shields.io/github/license/S222em/hue.js.svg?style=for-the-badge
[license-url]: https://github.com/S222em/hue.js/blob/master/LICENSE.txt
[wiki-url]: https://github.com/S222em/hue.ts/wiki
