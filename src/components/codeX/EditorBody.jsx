import React from "react";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/mode-swift";

import {
  Button,
  TextField,
  makeStyles,
  createStyles,
  Backdrop,
  CircularProgress,
  LinearProgress,
  Theme,
} from "@material-ui/core";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import { ThemeProvider } from "@material-ui/styles";

import axios from "axios";
import { darkTheme } from "./MaterialTheming";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      display: "grid",
      gridGap: "0 20px",
      gridTemplateRows: "calc(100% - 200px) 200px",
      "& .ace_gutter": {
        backgroundColor: "#19202b",
      },
      "& .ace_editor": {
        backgroundColor: "#19202b",
      },
      "& .ace_support.ace_function": {
        color: "#2196F3",
      },
      [theme.breakpoints.up("sm")]: {
        gridTemplateRows: "unset",
        gridTemplateColumns: "calc(100% - 350px) 330px",
      },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    editor: {
      height: "100% !important",
      width: "100% !important",
      borderBottom: "2px solid #2196F3",
      "& *": {
        fontFamily: "monospace",
      },
      [theme.breakpoints.up("sm")]: {
        borderBottom: "none",
        borderRight: "2px solid #2196F3",
      },
    },
    output: {
      display: "grid",
      gridTemplateRows: "auto 1fr auto",
    },
    selectlang: {
      height: "32px",
      margin: "7px 0",
      textAlign: "left !important",
    },
    runPanel: {
      textAlign: "left !important",
    },
    runBtn: {
      marginRight: 10,
    },
    inputModal: {
      height: "fit-content",
      width: "90%",
      maxHeight: 500,
      maxWidth: 400,
      background: "#19202b",
      borderRadius: "5px",
      padding: 15,
      textAlign: "left",
      "& text": {
        display: "block",
        color: "#2196F3",
        fontSize: "20px",
      },
      "& smallertext": {
        display: "block",
        fontSize: "14px",
      },
    },
    modalInput: {
      width: "100%",
      marginTop: "10px",
    },
    runBtnOnModal: {
      marginTop: "20px",
    },
    buttonProgress: {
      color: "white",
      margin: "auto",
    },
    outputTitle: {
      color: "#2196F3",
      margin: "7px 0",
      textAlign: "left !important",
    },
    outputTerminal: {
      textAlign: "left",
      color: "white",
      overflow: "auto",
      whiteSpace: "pre-line",
      fontFamily: "monospace",
      fontSize: "17px",
    },
  })
);

function EditorBody() {
  const classes = useStyles();
  const [codeFontSize, setCodeFontSize] = React.useState(16),
    [showLoader, setShowLoader] = React.useState(false),
    [lang, selectlang] = React.useState("py"),
    [editorLanguage, setEditorLanguage] = React.useState("py"),
    [code, setCode] = React.useState(``),
    [outputValue, setOutputValue] = React.useState(""),
    [takeInput, setTakeInput] = React.useState(false),
    [executing, setExecuting] = React.useState(false),
    [input, setInput] = React.useState("");

  window.addEventListener("resize", (e) => {
    if (window.innerWidth > 600) {
      setCodeFontSize(20);
    } else {
      setCodeFontSize(14);
    }
  });

  React.useEffect(() => {
    if (window.innerWidth > 600) setCodeFontSize(20);
    else setCodeFontSize(14);

  }, []);

  React.useEffect(() => {
    if (lang !== "") {
      let langArray = {
        cpp: "c_cpp",
        java: "java",
        c: "c_cpp",
        cs: "csharp",
        rb: "ruby",
        py: "python",
        kt: "kotlin",
        swift: "swift",
      };
      setEditorLanguage(langArray[lang]);
    }
  }, [lang]);

  const createExecutionRequest = () => {
    setTakeInput(false);
    setExecuting(true);
    var data = {
      code: code,
      language: lang,
      input: input,
    };

    var config = {
      method: "post",
      url: "https://code-x-api.onrender.com/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setExecuting(false);
        if (response.data.success) setOutputValue(response.data.output);
        else setOutputValue(response.data.error);
      })
      .catch(function (error) {
        setExecuting(false);
        setOutputValue("Network Error");
      });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Backdrop
        className={classes.backdrop}
        open={showLoader}
        onClick={() => {
          setShowLoader(false);
        }}
      >
        <CircularProgress color="primary" />
      </Backdrop>
      <Backdrop
        className={classes.backdrop}
        open={takeInput}
        onClick={() => {
          setTakeInput(false);
          setExecuting(false);
        }}
      >
        <div
          className={classes.inputModal}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <text>Input</text>
          <smallertext>
            If your code requires an input, please type it down below otherwise
            leave it empty. For multiple inputs, type in all your inputs line by
            line.
          </smallertext>
          <TextField
            id="outlined-basic"
            label="STD Input"
            variant="filled"
            className={classes.modalInput}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            spellCheck={false}
            rowsMax={7}
            multiline
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.runBtnOnModal}
            startIcon={<PlayArrowRoundedIcon />}
            onClick={createExecutionRequest}
          >
            Run
          </Button>
        </div>
      </Backdrop>
      <div className={classes.body}>
        <AceEditor
          mode={editorLanguage}
          theme="dracula"
          onChange={(e) => {
            setCode(e);
          }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            fontSize: 20,
            showPrintMargin: false,
          }}
          value={code}
          className={classes.editor}
          // readOnly={notOwner}
        />
        <div className={classes.output}>
          <div className={classes.outputTitle}>Output</div>
          <div className={classes.outputTerminal}>{`${outputValue}`}</div>
          <div className={classes.runPanel}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              className={classes.runBtn}
              startIcon={<PlayArrowRoundedIcon />}
              onClick={() => {
                setTakeInput(true);
              }}
              disabled={executing}
            >
              Run
            </Button>
            {executing && (
              <LinearProgress size={14} className={classes.buttonProgress} />
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default EditorBody;
