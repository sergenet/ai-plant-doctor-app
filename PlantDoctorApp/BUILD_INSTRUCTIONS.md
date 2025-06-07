# AI Plant Doctor - Android Build Instructions

## Prerequisites
1. Node.js (version 16 or higher)
2. Java Development Kit (JDK 17)
3. Android Studio with Android SDK
4. Git

## Setup Steps

### 1. Navigate to Project Directory
```bash
cd plantdoctorapp
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install Expo CLI (if not already installed)
```bash
npm install -g @expo/cli
```

### 4. Generate Native Android Code
```bash
expo prebuild --platform android
```

### 5. Build APK
```bash
cd android
./gradlew assembleRelease
```

### 6. Find Your APK
The generated APK will be located at:
```
android/app/build/outputs/apk/release/app-release.apk
```

## Alternative Method - AAB for Play Store
For Google Play Store submission:
```bash
./gradlew bundleRelease
```
Find AAB at: `android/app/build/outputs/bundle/release/app-release.aab`

## Troubleshooting

### If gradlew is not executable:
```bash
chmod +x gradlew
```

### If build fails with memory issues:
Add to `android/gradle.properties`:
```
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
```

### Clean build if needed:
```bash
./gradlew clean
./gradlew assembleRelease
```

## Testing the APK
1. Enable "Unknown Sources" in Android settings
2. Transfer APK to your Android device
3. Install and test the app

## Next Steps
- Test all app features
- Add OpenAI API key for plant diagnosis
- Integrate Stripe for premium subscriptions
- Prepare for Google Play Store submission