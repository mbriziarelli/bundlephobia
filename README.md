# bundlephobia

A rewrite of https://github.com/pastelsky/bundlephobia

## Installation

In order to compile and run **Bundlephobia**, you'll need to have installed on your computer:

- **node.js** version 10 or 12. This app has been compiled and run on both versions. It is not guaranteed that it will compile and run on node.js version previous than 10 or on node 13.x.x. You can download the installer from the [official Node.js website](https://nodejs.org/en/)
- **yarn** version 1.x.x. Follow instructions [here](https://classic.yarnpkg.com/en/docs/install#mac-stable)

## Dependencies

When both node.js and yarn have been installed, enter

```
yarn
```

in your shell. This command will install all the dependencies in the `node_modules` folder.

---

## Running the app in development environment

In order to automatically build and run the app locally, enter

```
yarn dev
```

in your shell, then navigate to [localhost:3000](https://localhost:3000/) using your favorite navigator. To stop the app, press simultaneously `control + C`.

## Running the app in production environment

In order to build the app for production, enter

```
yarn build
```

in your shell.
In order to run the app in production environment, after building it, enter

```
yarn start
```

in your shell.

---

## Testing the app

In order to run all the unit tests and display code coverage, enter

```
yarn test:unit
```

in your shell.

## Linting the app

In order to lint the app against **ESLint** rules, enter

```
yarn test:lint
```

in your shell. If some errors appear and ESlint tells you that it can automatically fix some of them, you can enter

```
yarn test:lint --fix
```

in your shell.

## Altogether linting and testing the app

If you want to perform the two previous operations with only one command, enter

```
yarn test
```

in your shell.

## View test coverage

When you have run the tests for the first time, a simple coverage report is written in the terminal. To have a more detailed view of code coverage, you can open `./coverage/lcov-report/index.html` in your favorite browser.

---

## Note for Windows users

This app has been written on a Mac. Therefore scripts in `package.json` should work on this platform and also Linux. Windows users using **PowerShell** or **cmd** will not be able to run the app because they don't support `bash` or `zsh` syntax for setting environment variables.

---

## Preferred editor or IDE

Every modern IDE should be able to open this app's folder and should allow to edit it. Nevertheless, this app has been written using [VScode](https://code.visualstudio.com/), which we strongly recommend. This is the reason why the app's repo includes the `.vscode` folder, configuring some specific plugins for this IDE.

### Superior TypeScript support

**VSCode** is written in TypeScript, like the current app. It has out of the box an outstanding support for this language.

## Recommended VSCode plugins

We recommend the following plugins to have the best experience in VSCode, editing and running this app.

- [Babel JavaScript](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
