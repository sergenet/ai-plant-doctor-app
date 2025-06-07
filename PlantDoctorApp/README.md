# AI Plant Doctor Mobile App

A React Native mobile application that provides AI-powered plant disease diagnosis with a freemium subscription model.

## Features
- 3 free plant diagnoses
- Camera integration for plant photos
- AI-powered disease detection
- Premium subscription ($4.99/month or $39.99/year)
- Clean, intuitive user interface

## Quick Start

### 1. Navigate to your project directory
```bash
cd plantdoctorapp
```

### 2. Install dependencies
```bash
npm install
```

### 3. Generate Android build files
```bash
expo prebuild --platform android
```

### 4. Build APK
```bash
cd android
./gradlew assembleRelease
```

Your APK will be created at: `android/app/build/outputs/apk/release/app-release.apk`

## Project Structure
```
plantdoctorapp/
├── App.js                 # Main app navigation
├── package.json           # Dependencies
├── app.json              # Expo configuration
├── assets/               # App icons and images
├── src/
│   └── screens/
│       ├── HomeScreen.js     # Main screen
│       ├── CameraScreen.js   # Plant diagnosis
│       └── PremiumScreen.js  # Subscription plans
└── android/              # Generated after prebuild
```

## Configuration

### API Integration
To enable AI plant diagnosis, add your OpenAI API key in `src/screens/CameraScreen.js`:
```javascript
const OPENAI_API_KEY = 'your-openai-api-key-here';
```

### Payment Integration
Premium subscriptions use Stripe. Configure payment handling in `src/screens/PremiumScreen.js`.

## Building for Production

### APK (for testing)
```bash
cd android
./gradlew assembleRelease
```

### AAB (for Google Play Store)
```bash
cd android
./gradlew bundleRelease
```

## Troubleshooting

### Permission Issues
```bash
chmod +x android/gradlew
```

### Memory Issues
Add to `android/gradle.properties`:
```
org.gradle.jvmargs=-Xmx4096m
```

### Clean Build
```bash
cd android
./gradlew clean
./gradlew assembleRelease
```

## App Store Submission
1. Test the APK thoroughly
2. Generate AAB for Play Store
3. Prepare store listing with screenshots
4. Submit for review

## Support
For build issues, ensure you have:
- Node.js 16+
- JDK 17
- Android SDK
- Expo CLI