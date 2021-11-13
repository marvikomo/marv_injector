# marv_injector

A lightweight dependency injection container for TypeScript/JavaScript for
constructor injection.

<!-- TOC depthFrom:1 depthTo:3 -->

- [marv_injector](#tsyringe)
  - [Installation](#installation)
- [API](#api)
  - [Decorators](#decorators)
    - [injector()](#injectable)
- [Contributing](#contributing)

<!-- /TOC -->

## Installation

Install by `npm`

```sh
npm install --save marv_injector
```


Modify your `tsconfig.json` to include the following settings

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

Add a polyfill for the Reflect API (examples below use reflect-metadata). You can use:

- [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)
- [core-js (core-js/es7/reflect)](https://www.npmjs.com/package/core-js)
- [reflection](https://www.npmjs.com/package/@abraham/reflection)

The Reflect polyfill import should only be added once, and before DI is used:

```typescript
// main.ts
import "reflect-metadata";

// Your code here...
```

# API

Marv_injector performs [Constructor Injection](https://en.wikipedia.org/wiki/Dependency_injection#Constructor_injection)
on the constructors of decorated classes.

## Decorators

### injector()

Class decorator factory that allows the class' dependencies to be injected at
runtime.

#### Usage

```typescript
import {injector} from "marv_injector";

@injector()
class Foo {
  constructor(private database: Database) {}
}



# Contributing

This project welcomes contributions and suggestions.
