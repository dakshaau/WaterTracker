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
        "id": "cordova-plugin-chrome-apps-common.events",
        "file": "plugins/cordova-plugin-chrome-apps-common/events.js",
        "pluginId": "cordova-plugin-chrome-apps-common",
        "clobbers": [
            "chrome.Event"
        ]
    },
    {
        "id": "cordova-plugin-chrome-apps-common.errors",
        "file": "plugins/cordova-plugin-chrome-apps-common/errors.js",
        "pluginId": "cordova-plugin-chrome-apps-common"
    },
    {
        "id": "cordova-plugin-chrome-apps-common.stubs",
        "file": "plugins/cordova-plugin-chrome-apps-common/stubs.js",
        "pluginId": "cordova-plugin-chrome-apps-common"
    },
    {
        "id": "cordova-plugin-chrome-apps-common.helpers",
        "file": "plugins/cordova-plugin-chrome-apps-common/helpers.js",
        "pluginId": "cordova-plugin-chrome-apps-common"
    },
    {
        "id": "cordova-plugin-sqlite-2.sqlitePlugin",
        "file": "plugins/cordova-plugin-sqlite-2/dist/sqlite-plugin.js",
        "pluginId": "cordova-plugin-sqlite-2",
        "clobbers": [
            "sqlitePlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.0",
    "cordova-plugin-dialogs": "1.3.0",
    "cordova.custom.plugins.exitapp": "1.0.0",
    "cordova-plugin-chrome-apps-common": "1.0.7",
    "cordova-plugin-sqlite-2": "1.0.4"
};
// BOTTOM OF METADATA
});