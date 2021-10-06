"use strict";
exports.__esModule = true;
var colors_1 = require("@material-ui/core/colors");
var deepmerge_1 = require("deepmerge");
var constants_1 = require("../constants");
var customBlue = {
    50: "#e9f0fb",
    100: "#c8daf4",
    200: "#a3c1ed",
    300: "#7ea8e5",
    400: "#6395e0",
    500: "#4782da",
    600: "#407ad6",
    700: "#376fd0",
    800: "#2f65cb",
    900: "#2052c2 "
};
var defaultVariant = {
    name: constants_1.THEMES.DEFAULT,
    palette: {
        type: "light",
        primary: {
            main: customBlue[700],
            contrastText: "#FFF"
        },
        secondary: {
            /* main: customBlue[500], */
            main: colors_1.red[500],
            contrastText: "#FFF"
        },
        background: {
            "default": "#F7F9FC",
            paper: "#FFF"
        }
    },
    header: {
        color: colors_1.grey[500],
        background: "#FFF",
        search: {
            color: colors_1.grey[800]
        },
        indicator: {
            background: customBlue[600]
        }
    },
    footer: {
        color: colors_1.grey[500],
        background: "#FFF"
    },
    sidebar: {
        color: colors_1.grey[200],
        background: "#233044",
        header: {
            color: colors_1.grey[200],
            background: "#233044",
            brand: {
                color: customBlue[500]
            }
        },
        footer: {
            color: colors_1.grey[200],
            background: "#1E2A38",
            online: {
                background: colors_1.green[500]
            }
        },
        badge: {
            color: "#FFF",
            background: customBlue[500]
        }
    }
};
var darkVariant = deepmerge_1["default"](defaultVariant, {
    name: constants_1.THEMES.DARK,
    palette: {
        type: "dark",
        primary: {
            main: customBlue[600],
            contrastText: "#FFF"
        },
        background: {
            "default": "#1B2635",
            paper: "#233044"
        },
        text: {
            primary: "rgba(255, 255, 255, 0.95)",
            secondary: "rgba(255, 255, 255, 0.5)"
        }
    },
    header: {
        color: colors_1.grey[300],
        background: "#1B2635",
        search: {
            color: colors_1.grey[200]
        }
    },
    footer: {
        color: colors_1.grey[300],
        background: "#233044"
    }
});
var lightVariant = deepmerge_1["default"](defaultVariant, {
    name: constants_1.THEMES.LIGHT,
    palette: {
        type: "light"
    },
    header: {
        color: colors_1.grey[200],
        background: customBlue[800],
        search: {
            color: colors_1.grey[100]
        },
        indicator: {
            background: colors_1.red[700]
        }
    },
    sidebar: {
        color: colors_1.grey[900],
        background: "#FFF",
        header: {
            color: "#FFF",
            background: customBlue[800],
            brand: {
                color: "#FFFFFF"
            }
        },
        footer: {
            color: colors_1.grey[800],
            background: "#F7F7F7",
            online: {
                background: colors_1.green[500]
            }
        }
    }
});
var blueVariant = deepmerge_1["default"](defaultVariant, {
    name: constants_1.THEMES.BLUE,
    palette: {
        type: "light"
    },
    sidebar: {
        color: "#FFF",
        background: customBlue[700],
        header: {
            color: "#FFF",
            background: customBlue[800],
            brand: {
                color: "#FFFFFF"
            }
        },
        footer: {
            color: "#FFF",
            background: customBlue[800],
            online: {
                background: "#FFF"
            }
        },
        badge: {
            color: "#000",
            background: "#FFF"
        }
    }
});
var greenVariant = deepmerge_1["default"](defaultVariant, {
    name: constants_1.THEMES.GREEN,
    palette: {
        primary: {
            main: colors_1.green[800],
            contrastText: "#FFF"
        },
        secondary: {
            main: colors_1.green[500],
            contrastText: "#FFF"
        }
    },
    header: {
        indicator: {
            background: colors_1.green[600]
        }
    },
    sidebar: {
        color: "#FFF",
        background: colors_1.green[700],
        header: {
            color: "#FFF",
            background: colors_1.green[800],
            brand: {
                color: "#FFFFFF"
            }
        },
        footer: {
            color: "#FFF",
            background: colors_1.green[800],
            online: {
                background: "#FFF"
            }
        },
        badge: {
            color: "#000",
            background: "#FFF"
        }
    }
});
var indigoVariant = deepmerge_1["default"](defaultVariant, {
    name: constants_1.THEMES.INDIGO,
    palette: {
        primary: {
            main: colors_1.indigo[600],
            contrastText: "#FFF"
        },
        secondary: {
            main: colors_1.indigo[400],
            contrastText: "#FFF"
        }
    },
    header: {
        indicator: {
            background: colors_1.indigo[600]
        }
    },
    sidebar: {
        color: "#FFF",
        background: colors_1.indigo[700],
        header: {
            color: "#FFF",
            background: colors_1.indigo[800],
            brand: {
                color: "#FFFFFF"
            }
        },
        footer: {
            color: "#FFF",
            background: colors_1.indigo[800],
            online: {
                background: "#FFF"
            }
        },
        badge: {
            color: "#000",
            background: "#FFF"
        }
    }
});
var variants = [
    defaultVariant,
    darkVariant,
    lightVariant,
    blueVariant,
    greenVariant,
    indigoVariant,
];
exports["default"] = variants;
