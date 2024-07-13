import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    // primary: {
    //   main: "#004AAD",
    // },
    // error: {
    //   main: "#ff5454",
    // },
    // success: {
    //   main: "#9cff83",
    // },
    // info: {
    //   main: "#54a3ff",
    // },
    // warning: {
    //   main: "#ffd15b",
    // },
  },
  // unstable_sxConfig: {
  //   backgroundColor: {
  //     themeKey: "dark",
  //   },
  // },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          borderRadius: "12px",
          transition: "0.5s all ease-in-out",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "10px 10px 20px #babecc,-10px -10px 20px #ffffff ",
          borderRadius: "16px",
          backgroundColor: "#474747",
          color: "#ffffff",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          color: "#fff",
          padding: "20px 10px",
          border: "none",
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          "&.MuiTab-root": {
            backgroundColor: "#000000",
            color: "#fff",
            border: 0,

            textTransform: "capitalize",
            "&:hover": {
              border: 0,
            },
          },
          "&.Mui-selected": {
            backgroundColor: "#004aad",

            // borderColor: "#373985",
          },
          "&.MuiTab-indicator": {
            display: "none !important",
          },
          "&:first-child": {
            borderRadius: "16px 0 0 16px",
          },
          "&:last-child": {
            borderRadius: "0 16px 16px 0",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },

    MuiListItem: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          color: "white",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        secondary: {
          color: "white",
        },
        primary: {
          color: "white",
        },
        root: {
          color: "white",
        },
      },
    },

    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "white",
          "&:hover": {
            backgroundColor: "rgb(0,74,173,0.4)",
            transition: "0.5s all ease-in-out",
          },
        },
      },
    },

    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
  },

  typography: {
    fontFamily: "inter",
    color: "white",
    h1: {
      color: "white",
      fontSize: "34px",
    },
    h2: {
      color: "white",
      fontSize: "30px",
    },
    h3: {
      color: "white",
      fontSize: "24px",
    },
    h4: {
      color: "white",
      fontSize: "20px",
    },
    h5: {
      color: "white",
      fontSize: "18px",
    },
    h6: {
      color: "white",
      fontSize: "16px",
    },
    subtitle1: {
      color: "white",
      fontSize: "14px",
    },
    subtitle2: {
      color: "white",
    },
    body1: {
      color: "white",
    },
    body2: {
      color: "white",
    },
    caption: {
      color: "white",
    },
  },
});

export default darkTheme;
