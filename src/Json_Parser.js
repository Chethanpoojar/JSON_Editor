import React, { useState } from "react";
import {
  TextField,
  AccordionDetails,
  Accordion,
  Grid,
  Chip,
  styled,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

const EditableJSON = ({  editedJSON, setEditedJSON }) => {
  const AccordionSummary2 = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const handleChange = (key, value) => {
    setEditedJSON((prevJSON) => {
      const updateNestedValue = (obj, keys, newValue) => {
        const updatedObj = { ...obj };
        let nestedObj = updatedObj;
        for (let i = 0; i < keys.length - 1; i++) {
          nestedObj = nestedObj[keys[i]];
        }
        nestedObj[keys[keys.length - 1]] = newValue;
        return updatedObj;
      };
  
      const keys = key.split('.');
      const updatedJSON = updateNestedValue(prevJSON, keys, value);
  
      return updatedJSON;
    });
  };

  const renderField = (key, value) => {
    if (typeof value === "number") {
      return (
        <Accordion key={key}>
          <AccordionSummary2 expandIcon={<ExpandMoreIcon />}>
            <Typography>{key}</Typography>
          </AccordionSummary2>
          <AccordionDetails>
            <TextField
              size="small"
              type="number"
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              variant="outlined"
            />
          </AccordionDetails>
        </Accordion>
      );
    } else if (typeof value === "string") {
      return (
        <Accordion key={key}>
          <AccordionSummary2 expandIcon={<ExpandMoreIcon />}>
            <Typography>{key}</Typography>
          </AccordionSummary2>
          <AccordionDetails>
            <TextField
              size="small"
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              variant="outlined"
            />
          </AccordionDetails>
        </Accordion>
      );
    } else if (Array.isArray(value)) {
      return (
        <Accordion key={key}>
          <AccordionSummary2 expandIcon={<ExpandMoreIcon />}>
            <Typography>{key}</Typography>
          </AccordionSummary2>
          <AccordionDetails>
            {value.map((item, index) => {
              if (typeof item === "object") {
                return (
                  <>
                    {Object.entries(item).map(([key, value]) => (
                      <Grid item xs={12} key={key}>
                        {renderField(key, value)}
                      </Grid>
                    ))}
                  </>
                );
              } else {
                return (
                  <Chip
                    key={index}
                    label={item}
                    onDelete={() => handleArrayChange(key, index)}
                    variant="outlined"
                  />
                );
              }
            })}
            <TextField
              size="small"
              label="Add item"
              value={""}
              onChange={(e) => handleArrayChange(key, null, e.target.value)}
              variant="outlined"
              // fullWidth
            />
          </AccordionDetails>
        </Accordion>
      );
    } else if (typeof value === "object") {
      return (
        <Accordion key={key}>
          <AccordionSummary2 expandIcon={<ExpandMoreIcon />}>
            <Typography>{key}</Typography>
          </AccordionSummary2>
          <AccordionDetails>
            <EditableJSON
              editedJSON={value}
              setEditedJSON={setEditedJSON}
            />
          </AccordionDetails>
        </Accordion>
      );
    }
  };

  const handleArrayChange = (key, index, newValue) => {
    setEditedJSON((prevJSON) => {
      const newArray = [...prevJSON[key]];
      if (index === null) {
        newArray.push(newValue);
      } else {
        newArray.splice(index, 1);
      }
      return {
        ...prevJSON,
        [key]: newArray,
      };
    });
  };

  return (
    <Grid container spacing={2}>
      {Object.entries(editedJSON).map(([key, value]) => (
        <Grid item xs={12} key={key}>
          {renderField(key, value)}
        </Grid>
      ))}
      {/* <Grid item xs={12}>
        <Button variant="contained" color="primary">
          Save Changes
        </Button>
      </Grid> */}
    </Grid>
  );
};

export default EditableJSON;
