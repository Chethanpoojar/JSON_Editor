import "./App.css";
import { useState } from "react";
import { Box, Button, Grid, Stack } from "@mui/material";
import { json_object, fruit } from "./JSONdata";
import { Editor } from "@monaco-editor/react";
import JsonParser from "./Json_Parser";
import EditableJSON from "./Json_Parser";

function App() {
  const [code, setCode] = useState("");
  const [isValidJson, setIsValidJson] = useState(false);
  const [editedJSON, setEditedJSON] = useState(json_object);

  const onChange = (newValue, e) => {
    setCode(newValue);
    try {
      JSON.parse(newValue);
      setIsValidJson(true);
    } catch (error) {
      setIsValidJson(false);
    }
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
      const blob = new Blob([JSON.stringify(json, null, 2)], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const res = window.prompt("Enter file name");
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
        setEditedJSON(JSON.parse(JSON.stringify(parsedJson, null, 2)));
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
              onClick={() => downloadJson(editedJSON)}
              variant="contained"
              color="secondary"
            >
              Export
            </Button>
            {/* <Button
              disabled={!isValidJson}
              onClick={() => beautifyJson(editedJSON)}
              variant="contained"
            >
              Beautify
            </Button> */}
          </Stack>
        </Box>

        <Box flexGrow={1} overflow={"auto"}>
          {/* <JsonParser jsonData={data2} /> */}
          <EditableJSON editedJSON={editedJSON} setEditedJSON={setEditedJSON} />
          {/* <Editor
            height={"100%"}
            language="json"
            defaultValue={code}
            value={code}
            onChange={onChange}
          /> */}
        </Box>
      </Box>
    </Box>
  );
}

export default App;

const jsonData = {
  name: "John",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Anytown",
    zipcode: "12345",
  },
  hobbies: ["Reading", "Gardening", "Cooking"],
  key4: [{ a: "a", b: { b1: "b1" } }, { b: "b" }, { c: "c" }],
  name2: "chethan",
  data: ["a", "b", "c"],
  obj: {
    a1: {
      key1: "value1 ",
      key2: "value2",
      key3: ["d", "e", "f"],
      key4: {
        key41: "value41",
      },
    },
  },
  obj2: {
    a1: {
      key1: "value1 ",
      key2: "value2",
      key3: ["d", "e", "f"],
      key4: {
        key41: "value41",
      },
    },
  },
};
