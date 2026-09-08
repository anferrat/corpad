# Corpad Agent Notes

## Setup and Commands

- This is a single React Native 0.74 app. Use Node 18+ and Yarn 3.6.4 as declared by `package.json` and `.yarnrc.yml`; use Yarn rather than npm even though `package-lock.json` exists.
- The Yarn config points at `.yarn/releases/yarn-3.6.4.cjs`, which is currently absent from the checkout. If installation fails for that reason, restore/provide the pinned Yarn release instead of switching package managers.
- Install dependencies with `yarn install`, then run `yarn bootstrap` when setting up or changing UI Kitten theme mappings. This generates/updates `src/styles/mapping.json`, which Metro uses.
- Run `yarn start` for Metro, `yarn ios` for iOS, and `yarn android` for Android.
- Run `yarn lint` for ESLint and `yarn test` for Jest. Jest uses the React Native preset; there are currently no tracked Jest test files. For a focused test when one exists, use `yarn test --runInBand <path>`.
- The package release scripts hardcode Android version values. CI instead injects `versionName` and `versionCode` into Gradle, so check the intended release version before using `yarn build` or `yarn bundle-android`.

## Native Setup

- iOS targets 15.5. Use the CocoaPods range pinned in `Gemfile` (`>= 1.13`, `< 1.15`); after dependency changes, run `bundle exec pod install` from `ios/` so `Podfile.lock` and the Xcode workspace stay synchronized.
- Android uses Gradle 8.6 and CI builds with JDK 17. Release signing is supplied through Gradle properties/CI secrets; do not print or commit signing credentials.

## Code Layout

- `index.js` registers `App.tsx`, which creates the Redux store, providers, navigation container, and global overlays.
- `src/navigation` owns the navigation graph. Most `src/screens` files are route shells that handle navigation parameters and compose feature exports; keep feature UI and logic in `src/features`.
- Features are organized by domain and commonly contain `components/`, `hooks/`, `helpers/`, and `index.js` exports. Follow the nearest existing feature rather than imposing a new structure.
- `src/store/actions` and `src/store/reducers` own Redux state; this is not an RTK or single-slice store.
- Treat `src/app` as the application/backend layer: feature UI/hooks call controllers, controllers call services, and services call repositories and domain entities.
- Controllers usually extend `src/app/utils/Controller.js`, centralize callback/error-code handling, assemble services, and expose exported wrapper functions. Shared dependencies are assembled in `src/app/controllers/_instances/`.
- Services implement application use cases and coordinate validation, entities, presenters, and repositories. Repositories own SQLite, filesystem, Bluetooth, NFC, GPS, Google Drive, spreadsheet, and other native integrations; preserve their persistence and error-translation boundaries rather than calling native modules directly from screens.
- Shared domain models and validation live in `src/app/entities` and `src/app/validation`; shared values live in `src/constants`.
- User-facing failures use `src/helpers/error_handler.js` through the controller error flow.

## Cross-Feature Communication

- Cross-feature coordination currently uses `EventRegister` from `react-native-event-listeners` with string event names. Inspect existing names before adding one and always remove listeners during cleanup; there is no shared event enum.

## Project Quirks

- UI code is linted with `@react-native`; Prettier uses single quotes, no bracket spacing, trailing commas, and omitted arrow-function parentheses where valid.
- The checked-in Azure Android pipeline calls `npm run bootstrap-ui-kitten`, but that script does not exist. The package script is `bootstrap`; update the pipeline or invoke the existing script rather than copying that CI command.
