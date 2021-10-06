"use strict";
exports.__esModule = true;
exports.authorityConfig = void 0;
exports.authorityConfig = {
    appId: process.env.REACT_APP_ID,
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
    postLogoutRedirectUri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI,
    authority: process.env.REACT_APP_AUTHORITY,
    scopes: [
        'user.read',
        'api://4c0b9c3a-ffb8-4119-8df5-9bb2997bd482/access_as_user'
    ]
};
