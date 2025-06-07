# AI Plant Doctor Setup Guide

## Repository Structure

This repository contains your AI Plant Doctor mobile app ready for iOS and Android submission.

## Current Status

✓ React Native app structure created
✓ GitHub Actions workflows configured
✓ App icons folder prepared
✓ Basic build automation ready

## Next Steps for App Store Submission

### 1. Add App Icons
Upload your generated app icons to the `icons/` folder:
- iOS icons (20 different sizes)
- Android icons (7 different sizes)

### 2. Configure Build Secrets
In GitHub repository Settings → Secrets, add:

**For iOS:**
- IOS_CERTIFICATE_P12_BASE64
- IOS_CERTIFICATE_PASSWORD
- APP_STORE_CONNECT_ISSUER_ID
- APP_STORE_CONNECT_KEY_ID
- APP_STORE_CONNECT_PRIVATE_KEY

**For Android:**
- ANDROID_KEYSTORE_BASE64
- ANDROID_KEYSTORE_PASSWORD
- ANDROID_KEY_ALIAS
- ANDROID_KEY_PASSWORD

### 3. Test Build Process
- Go to Actions tab
- Run "iOS Build" or "Android Build" workflows
- Download build artifacts

### 4. Submit to App Stores
- iOS: Upload .ipa to App Store Connect
- Android: Upload .aab to Google Play Console

## App Information

- **Name:** AI Plant Doctor
- **Bundle ID:** com.gardenwithserge.aiplantdoctor
- **Privacy Policy:** https://gardenwithserge.com/privacy
- **Pricing:** Freemium (3 free analyses, $4.99/month premium)

## Support

Contact: support@gardenwithserge.com
