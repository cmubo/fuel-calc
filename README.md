# Fuel Calculator

This app is literally just what it says, you put in your MPG, price per litre, distance and how many people you want to split the cost between and it will give you a figure.

You can also save your past journeys to keep track of what you're spending.

There are no accounts, no ads, no analytics, no external APIs, no internet access needed at all. It's just an app and a database stored locally.

## Android Downloads

[Latest Version v1.0.0 Download](https://github.com/cmubo/fuel-calc/tree/main/downloads/android/downloads/fuel-calc-v1.0.0.apk)

Any previous versions can be found [here](https://github.com/cmubo/fuel-calc/tree/main/downloads/android/downloads/).

# Locally creating builds

## Android

### APK

1. Navigate to the android folder

2. use the assembleRelease command
   `./gradlew app:assembleRelease`

### Bundle

This is the recommended method for uploading to the play store.

1. Navigate to the android folder

2. use the bundleRelease command
   `./gradlew app:bundleRelease`

### Building for play store (signing)

Instructions can also be found here: https://docs.expo.dev/guides/local-app-production/

1. From the expo root aka project root, create a keystore by running:

    ```
    sudo keytool -genkey -v -keystore fuel-calc-upload-key.keystore -alias fuel-calc-key -keyalg RSA -keysize 2048 -validity 10000
    ```

    This will ask you to create a password, make sure you keep this password as its needed in the next steps.

2. Place the keystore file into the folder: `android/keystores`

3. Create a `gradle.properties` file in your global gradle directory.
   the global gradle directory should be at `~/.gradle`.

    You can also just run `touch ~/.gradle/gradle.properties`.

4. Inside the gradle.properties file, add the following:

    ```
    FUEL_CALC_UPLOAD_STORE_FILE=../keystores/fuel-calc-upload-key.keystore
    FUEL_CALC_UPLOAD_KEY_ALIAS=fuel-calc-key
    FUEL_CALC_UPLOAD_STORE_PASSWORD=
    FUEL_CALC_UPLOAD_KEY_PASSWORD=
    ```

5. From inside the android folder, run the `./gradlew app:bundleRelease` command to generate a release.

6. Here are instructions for google play submission: https://github.com/expo/fyi/blob/main/first-android-submission.md

# Viewing the local database

This will work smoothly on IOS but android you need to download the database and it isnt really worth the extra effort so instructions are only for IOS.

We use drizzle on this project, which should make seeing the data easier as the drizzle studio exists. Now the drizzle studio doesnt actually work... https://github.com/drizzle-team/drizzle-studio-expo/issues/7 and https://github.com/drizzle-team/drizzle-studio-expo/issues/12

Instead we can use an alternative like DBeaver, point it directly to the local sqlite file in the emulator and see the data that way. To find the path to the file, place this component somewhere where you can read the output.

```
import SQLPath from "@/components/SQLPath";

---

<SQLPath />
```

This will give you the path inside the emulator/device and then you prepend your local path to the emulator, mine would be:

```
/Users/${USER_NAME}/Library/Developer/CoreSimulator/Devices/619313DB-7EF6-444D-A717-C026C1EFC8F5/data/Containers/Data/Application/5806AAE8-C7B1-4695-BEDF-D3E72E506BAF/Documents/ExponentExperienceData/@anonymous/fuel-calc-cac814ca-a4b3-4c87-a734-ceb1edf98f89/SQLite/fuelcalc.db
```
