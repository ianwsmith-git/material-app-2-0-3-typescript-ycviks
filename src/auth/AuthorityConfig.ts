export const authorityConfig = {
    clientId: process.env.REACT_APP_ID! as string,
    redirectUri: window.location.origin, //process.env.REACT_APP_REDIRECT_URI! as string,
    postLogoutRedirectUri: window.location.origin,// process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI! as string,
    authority: process.env.REACT_APP_AUTHORITY! as string,
    validateAuthority: true,
    navigateToLoginRequestUrl: false,
    scopes: [
        'user.read',
        'api://2d239cc8-6609-4694-beab-cafcc098d08b/access_ass_user'
    ]
};
