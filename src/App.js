import "./App.css";
import ReactJson from "react-json-view";
import { useEffect, useState } from "react";
import { Box, Button, Grid, Stack } from "@mui/material";
import { json_object, fruit } from "./JSONdata";
import { Editor } from "@monaco-editor/react";

function App() {
  const [code, setCode] = useState("");
  const [isValidJson, setIsValidJson] = useState(false);

  console.log({ code });

  const onChange = (newValue, e) => {
    setCode(newValue);
    try {
      JSON.parse(newValue);
      setIsValidJson(true);
    } catch (error) {
      setIsValidJson(false);
    }
  };

  useEffect(() => {
    findKeys(code);
  }, []);

  const findKeys = (obj) => {
    const values = Object.values(obj);
    values.forEach(function (value) {
      if (typeof value === "object") {
        findKeys(value);
      }
    });
  };

  const beautifyJson = (code) => {
    try {
      const parsedJson = JSON.parse(code);
      const beautifiedContent = JSON.stringify(parsedJson, null, 2); // Indentation of 2 spaces
      setCode(beautifiedContent);
    } catch (error) {
      // console.error('Error beautifying JSON:', error);
      setCode(code);
    }
  };

  const downloadJson = (json) => {
    if (json) {
      const blob = new Blob([json], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
     const res =  window.prompt("Enter file name")
      a.download = `${res ?? "Updated_Json"}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      console.error("No data to download");
    }
  };

  const handleFileChange = (e) => {
    setCode("");
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      try {
        const parsedJson = JSON.parse(content);
        setCode(JSON.stringify(parsedJson, null, 2));
        setIsValidJson(true);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        setIsValidJson(false);
      }
    };
    reader.readAsText(file);
  };

  const handleImportClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <Box height={"100vh"} width={"100%"} display={"flex"} flexDirection={"row"}>
      <Box
        width={"100%"}
        display={"flex"}
        height={"100%"}
        flexDirection={"column"}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box>
            <h4>JSON Editor</h4>
          </Box>

          <Stack spacing={1} direction={"row"}>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Button variant="outlined" onClick={handleImportClick}>
              Import File
            </Button>
            <Button
              disabled={!isValidJson}
              onClick={() => downloadJson(code)}
              variant="contained"
              color="secondary"
            >
              Export
            </Button>
            <Button
              disabled={!isValidJson}
              onClick={() => beautifyJson(code)}
              variant="contained"
            >
              Beautify
            </Button>
          </Stack>
        </Box>

        <Box flexGrow={1} overflow={"auto"}>
          <Editor
            height={"100%"}
            language="json"
            defaultValue={code}
            value={code}
            onChange={onChange}
          />
        </Box>
      </Box>

      {/* <Box width={"50%"} height={"100vh"} overflow={"auto"}>
        <ReactJson
          src={json_object}
          onEdit={(edit) => setCode(edit["updated_src"])}
          onAdd={(add) => setCode(add["updated_src"])}
          onDelete={(del) => setCode(del["updated_src"])}
          quotesOnKeys={false}
          name="JSON"
          style={{ margin: "1rem 0rem 0rem 2rem" }}
        />
      </Box> */}
    </Box>
  );
}

export default App;
