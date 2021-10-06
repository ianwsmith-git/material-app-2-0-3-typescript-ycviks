"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthProvider = void 0;
var msal_browser_1 = require("@azure/msal-browser");
var react_1 = require("react");
var ApiConfig_1 = require("./ApiConfig");
var AuthorityConfig_1 = require("./AuthorityConfig");
var UserService_1 = require("./UserService");
var AuthProvider = /** @class */ (function () {
    function AuthProvider() {
        // Initialize the MSAL application object
        this.publicClientApplication = new msal_browser_1.PublicClientApplication({
            auth: {
                clientId: AuthorityConfig_1.authorityConfig.appId,
                redirectUri: AuthorityConfig_1.authorityConfig.redirectUri,
                authority: AuthorityConfig_1.authorityConfig.authority,
                postLogoutRedirectUri: AuthorityConfig_1.authorityConfig.postLogoutRedirectUri
            },
            cache: {
                cacheLocation: "sessionStorage",
                storeAuthStateInCookie: true
            }
        });
    }
    AuthProvider.prototype.getAllAccounts = function () {
        return this.publicClientApplication.getAllAccounts();
    };
    ;
    AuthProvider.prototype.normalizeError = function (error) {
        var normalizedError = {};
        if (typeof (error) === 'string') {
            var errParts = error.split('|');
            normalizedError = errParts.length > 1 ?
                { message: errParts[1], debug: errParts[0] } :
                { message: error };
        }
        else {
            normalizedError = {
                message: error.message,
                debug: JSON.stringify(error)
            };
        }
        return normalizedError;
    };
    AuthProvider.prototype.getUserProfile = function () {
        return __awaiter(this, void 0, Promise, function () {
            var accessToken, user, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.getAccessToken()];
                    case 1:
                        accessToken = _a.sent();
                        if (!accessToken) return [3 /*break*/, 3];
                        return [4 /*yield*/, UserService_1.getUserDetails(accessToken)];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, {
                                isAuthenticated: true,
                                user: {
                                    displayName: user.displayName,
                                    email: user.mail || user.userPrincipalName
                                },
                                error: null
                            }];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        throw err_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthProvider.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, Promise, function () {
            var accounts, silentResult, err_2, interactiveResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 6]);
                        accounts = this.publicClientApplication
                            .getAllAccounts();
                        if (accounts.length <= 0)
                            throw new Error('login_required');
                        return [4 /*yield*/, this.publicClientApplication
                                .acquireTokenSilent({
                                scopes: AuthorityConfig_1.authorityConfig.scopes,
                                account: accounts[0]
                            })];
                    case 1:
                        silentResult = _a.sent();
                        return [2 /*return*/, silentResult.accessToken];
                    case 2:
                        err_2 = _a.sent();
                        if (!this.isInteractionRequired(err_2)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.publicClientApplication
                                .acquireTokenPopup({
                                scopes: AuthorityConfig_1.authorityConfig.scopes
                            })];
                    case 3:
                        interactiveResult = _a.sent();
                        return [2 /*return*/, interactiveResult.accessToken];
                    case 4: throw err_2;
                    case 5: return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthProvider.prototype.isInteractionRequired = function (error) {
        if (!error.message || error.message.length <= 0) {
            return false;
        }
        return (error.message.indexOf('consent_required') > -1 ||
            error.message.indexOf('interaction_required') > -1 ||
            error.message.indexOf('login_required') > -1 ||
            error.message.indexOf('no_account_in_silent_request') > -1);
    };
    AuthProvider.prototype.login = function () {
        return __awaiter(this, void 0, Promise, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        // Login via popup
                        return [4 /*yield*/, this.publicClientApplication.loginPopup({
                                scopes: AuthorityConfig_1.authorityConfig.scopes,
                                prompt: "select_account"
                            })];
                    case 1:
                        // Login via popup
                        _a.sent();
                        return [4 /*yield*/, this.getUserProfile()];
                    case 2: 
                    // After login, get the user's profile
                    return [2 /*return*/, _a.sent()];
                    case 3:
                        err_3 = _a.sent();
                        throw err_3;
                    case 4:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthProvider.prototype.getApiToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accounts, silentResult, err_4, interactiveResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 6]);
                        accounts = this.publicClientApplication
                            .getAllAccounts();
                        if (accounts.length <= 0)
                            throw new Error('login_required');
                        return [4 /*yield*/, this.publicClientApplication
                                .acquireTokenSilent({ scopes: ApiConfig_1.apiConfig.scopes, account: accounts[0] })];
                    case 1:
                        silentResult = _a.sent();
                        return [2 /*return*/, silentResult.accessToken];
                    case 2:
                        err_4 = _a.sent();
                        if (!this.isInteractionRequired(err_4)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.publicClientApplication
                                .acquireTokenPopup({ scopes: ApiConfig_1.apiConfig.scopes })];
                    case 3:
                        interactiveResult = _a.sent();
                        return [2 /*return*/, interactiveResult.accessToken];
                    case 4: throw err_4;
                    case 5: return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthProvider.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accounts;
            return __generator(this, function (_a) {
                accounts = this.publicClientApplication.getAllAccounts();
                if (accounts && accounts.length > 0) {
                    this.publicClientApplication.logoutPopup({
                        account: accounts[0],
                        postLogoutRedirectUri: AuthorityConfig_1.authorityConfig.postLogoutRedirectUri,
                        authority: AuthorityConfig_1.authorityConfig.authority,
                        mainWindowRedirectUri: AuthorityConfig_1.authorityConfig.redirectUri
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    return AuthProvider;
}());
exports.AuthProvider = AuthProvider;
function withAuthProvider(WrappedComponent) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(props) {
            var _this = _super.call(this, props) || this;
            _this.mounted = false;
            _this.state = {
                error: null,
                isAuthenticated: false,
                user: {}
            };
            _this.authProvider = new AuthProvider();
            return _this;
        }
        class_1.prototype.componentDidMount = function () {
            this.mounted = true;
            // If MSAL already has an account, the user
            // is already logged in
            var accounts = this.authProvider.getAllAccounts();
            if (accounts && accounts.length > 0) {
                // Enhance user object with data from Graph
                this.getUserProfile();
            }
        };
        class_1.prototype.componentWillUnmount = function () {
            this.mounted = false;
        };
        class_1.prototype.render = function () {
            var _this = this;
            return react_1["default"].createElement(WrappedComponent, __assign({ error: this.state.error, isAuthenticated: this.state.isAuthenticated, user: this.state.user, login: function () { return _this.login(); }, logout: function () { return _this.logout(); }, getAccessToken: function () { return _this.authProvider.getAccessToken(); }, setError: function (message, debug) { return _this.setErrorMessage(message, debug); } }, this.props));
        };
        class_1.prototype.login = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authProvider.login().then(function (value) {
                                _this.setState({
                                    isAuthenticated: value.isAuthenticated,
                                    user: {
                                        displayName: value.user.displayName,
                                        email: value.user.mail || value.user.userPrincipalName,
                                        timeZone: value.timeZone || 'UTC',
                                        timeFormat: value.timeFormat
                                    },
                                    error: value.error
                                });
                            })["catch"](function (error) {
                                if (_this.mounted) {
                                    _this.setState({
                                        isAuthenticated: false,
                                        user: {},
                                        error: _this.normalizeError(error)
                                    });
                                }
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        class_1.prototype.getUserProfile = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authProvider.getUserProfile().then(function (value) {
                                if (_this.mounted) {
                                    _this.setState({
                                        isAuthenticated: value.isAuthenticated,
                                        user: {
                                            displayName: value.user.displayName,
                                            email: value.user.mail || value.user.userPrincipalName,
                                            timeZone: value.timeZone || 'UTC',
                                            timeFormat: value.timeFormat
                                        },
                                        error: value.error
                                    });
                                }
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        class_1.prototype.logout = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.authProvider.logout();
                    return [2 /*return*/];
                });
            });
        };
        class_1.prototype.setErrorMessage = function (message, debug) {
            this.setState({
                error: { message: message, debug: debug }
            });
        };
        class_1.prototype.normalizeError = function (error) {
            var normalizedError = {};
            if (typeof (error) === 'string') {
                var errParts = error.split('|');
                normalizedError = errParts.length > 1 ?
                    { message: errParts[1], debug: errParts[0] } :
                    { message: error };
            }
            else {
                normalizedError = {
                    message: error.message,
                    debug: JSON.stringify(error)
                };
            }
            return normalizedError;
        };
        return class_1;
    }(react_1["default"].Component));
}
exports["default"] = withAuthProvider;
