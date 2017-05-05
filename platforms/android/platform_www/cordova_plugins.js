cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-dialogs.notification",
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-plugin-dialogs.notification_android",
        "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova.custom.plugins.exitapp.exitApp",
        "file": "plugins/cordova.custom.plugins.exitapp/www/ExitApp.js",
        "pluginId": "cordova.custom.plugins.exitapp",
        "merges": [
            "navigator.app"
        ]
    },
    {
        "id": "cordova-plugin-nativestorage.mainHandle",
        "file": "plugins/cordova-plugin-nativestorage/www/mainHandle.js",
        "pluginId": "cordova-plugin-nativestorage",
        "clobbers": [
            "NativeStorage"
        ]
    },
    {
        "id": "cordova-plugin-nativestorage.LocalStorageHandle",
        "file": "plugins/cordova-plugin-nativestorage/www/LocalStorageHandle.js",
        "pluginId": "cordova-plugin-nativestorage"
    },
    {
        "id": "cordova-plugin-nativestorage.NativeStorageError",
        "file": "plugins/cordova-plugin-nativestorage/www/NativeStorageError.js",
        "pluginId": "cordova-plugin-nativestorage"
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.0",
    "cordova-plugin-dialogs": "1.3.0",
    "cordova.custom.plugins.exitapp": "1.0.0",
    "cordova-plugin-nativestorage": "2.2.2"
};
// BOTTOM OF METADATA
});