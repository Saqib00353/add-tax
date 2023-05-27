import { grey, orange, red } from "@mui/material/colors";

const containerTheme = {
  padding: {
    lg: "1rem 7rem",
    md: "1rem 3rem",
    sm: "1rem 1rem",
    xs: "1rem 0rem",
  },
};

const radioTheme = {
  "&.Mui-checked": {
    color: orange[600],
  },
};

const radioGroupTheme = {
  marginBlock: "1rem",
};

const headerTheme = {
  borderBottom: "1px solid #aaa",
};

const collectionTheme = {
  borderBottom: "1px solid #aaa",
  height: "40vh",
  overflow: "auto",
};

const subCollectionItemTheme = {
  marginLeft: "1.8rem",
};

const buttonTheme = {
  backgroundColor: orange[600],
  "&:hover": {
    backgroundColor: orange[800],
  },
  position: "absolute",
  right: 0,
  marginBlock: "1rem",
};

const searchTheme = {
  paddingBlock: "1rem",
};

const collectionItemTheme = {
  backgroundColor: grey[200],
  marginBlock: ".6rem",
  padding: "0 .6rem",
};

const buttonContainerTheme = {
  position: "relative",
};

const errorTheme = {
  color: red[800],
  padding: ".5rem",
};

export {
  radioTheme,
  headerTheme,
  buttonTheme,
  collectionTheme,
  searchTheme,
  collectionItemTheme,
  subCollectionItemTheme,
  buttonContainerTheme,
  containerTheme,
  radioGroupTheme,
  errorTheme,
};
