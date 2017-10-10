App.info({
    id: 'com.nmma.businessradio',
    version: '0.1.7',
    name: 'Business Radio 98.9',
    description: 'Business Radio FM 98.9',
    author: 'The New Media Group',
    email: 'info@business-radio.mn',
    website: 'http://business-radio.mn'
});
// Set up resources such as icons and launch screens.
App.icons({
    // ios
    // 'iphone': 'res/icons/icon-60.png',
    'iphone_2x': 'res/icons/icon-60@2x.png',
    'iphone_3x': 'res/icons/icon-60@3x.png',
    'ipad': 'res/icons/icon-76x76.png',
    'ipad_2x': 'res/icons/icon-76@2x.png',
    'ipad_pro': 'res/icons/icon-167x167.png',
    'ios_settings' : 'res/icons/icon-settings-29x29.png',
    'ios_settings_2x' : 'res/icons/icon-settings-29@2x.png',
    'ios_settings_3x' : 'res/icons/icon-settings-29@3x.png',
    'ios_spotlight' : 'res/icons/icon-spotlight-40x40.png',
    'ios_spotlight_2x' : 'res/icons/icon-spotlight-40@2x.png',

    // android
    'android_mdpi': 'res/icons/icon-mdpi.png',
    'android_hdpi': 'res/icons/icon-hdpi.png',
    'android_xhdpi': 'res/icons/icon-xhdpi.png',
    'android_xxhdpi': 'res/icons/icon-xxhdpi.png',
    'android_xxxhdpi': 'res/icons/icon-xxxhdpi.png',
});
App.launchScreens({
    // ios
    'iphone_2x': 'res/splash/splash-640x960.png',
    'iphone5': 'res/splash/splash-640x1136.png',
    'iphone6': 'res/splash/splash-750x1334.png',
    'iphone6p_portrait' : 'res/splash/splash-1242x2208.png',
    'iphone6p_landscape' : 'res/splash/splash-2208x1242.png',
    'ipad_portrait': 'res/splash/splash-768x1024.png',
    'ipad_portrait_2x': 'res/splash/splash-1536x2048.png',
    'ipad_landscape': 'res/splash/splash-1024x768.png',
    'ipad_landscape_2x': 'res/splash/splash-2048x1536.png',

    // android
    'android_mdpi_portrait': 'res/splash/splash-320x470.png',
    'android_mdpi_landscape': 'res/splash/splash-470x320.png',
    'android_hdpi_portrait': 'res/splash/splash-480x640.png',
    'android_hdpi_landscape': 'res/splash/splash-640x480.png',
    'android_xhdpi_portrait': 'res/splash/splash-720x960.png',
    'android_xhdpi_landscape': 'res/splash/splash-960x720.png',
    'android_xxhdpi_portrait': 'res/splash/splash-1080x1440.png',
    'android_xxhdpi_landscape': 'res/splash/splash-1440x1080.png',
});
// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '#1e1e1e');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
App.accessRule('*');
