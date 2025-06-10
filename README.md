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
