import { createStyles, createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    type: "light",
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

    // secondary: {
    //   main: "#f50057", // example secondary color
    // },
  },
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
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
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
            color: "#000000",
            // border: "1px solid #0044ad",
            marginBottom: "5px",
            borderRadius: "8px",
            textTransform: "capitalize",
            transition: "0.5s all ease-in-out",
            "&:hover": {
              backgroundColor: "rgb(0 74 173 / 10%)",
            },
          },
          "&.Mui-selected": {
            backgroundColor: "#004aad",
            color: "#fff",
            // borderColor: "#373985",
            "&:hover": {
              backgroundColor: "rgb(0 74 173)",
            },
          },
          "&.MuiTab-indicator": {
            display: "none !important",
          },
          //   "&:first-child": {
          //     borderRadius: "16px 0 0 16px",
          //   },
          //   "&:last-child": {
          //     borderRadius: "0 16px 16px 0",
          //   },
        },
      },
    },
  },
  //   typography: {
  //     fontFamily: "inter",

  //     h1: {
  //       color: "black",
  //       fontSize: "34px",
  //       fontWeight: "bold",
  //     },
  //     h2: {
  //       color: "black",
  //       fontSize: "30px",
  //       fontWeight: "bold",
  //     },
  //     h3: {
  //       color: "black",
  //       fontSize: "24px",
  //     },
  //     h4: {
  //       color: "black",
  //       fontSize: "20px",
  //     },
  //     h5: {
  //       color: "black",
  //       fontSize: "18px",
  //     },
  //     h6: {
  //       color: "black",
  //       fontSize: "16px",
  //     },
  //     subtitle1: {
  //       color: "black",
  //       fontSize: "14px",
  //     },
  //     subtitle2: {
  //       color: "black",
  //     },
  //     body1: {
  //       color: "black",
  //     },
  //     body2: {
  //       color: "black",
  //     },
  //   },
});

export default lightTheme;
