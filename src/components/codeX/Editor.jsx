import React from "react";
import brandingLogo from "./codexlogo.png";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { darkTheme } from "./MaterialTheming";

import EditorBody from "./EditorBody";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editorPage: {
      height: "100%",
      width: "100%",
      display: "grid",
      gridGap: "14px",
      gridTemplateRows: "auto 1fr"
    },
    brandingLogo: {
      cursor: "pointer"
    },
    header: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      "& > *": {
        margin: "auto 0"
      }
    },
    codeTitle: {
      color: "#2196F3",
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      textAlign: "center",
      height: "100%",
      width: "100%"
    },
    body: {
      height: "100%",
      width: "100%",
      display: "grid",
      gridTemplateRows: "70% 30%"
    }
  })
);

function Editor() {
  const classes = useStyles();
  const [className, setClassName] = React.useState("")

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <div className={classes.editorPage}>
          <div className={classes.header}>
            <img
              className={classes.brandingLogo}
              src={brandingLogo}
              alt="branding-logo"
            />
            <input
              onChange={(e) => {
                setClassName(e.target.value);
              }}
              className={classes.codeTitle}
              spellCheck={false}
              readOnly={true}
            />
          </div>
          <EditorBody />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default Editor;
