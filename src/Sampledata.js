import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Input, useStepContext } from "@mui/material";

const Sampledata = () => {
  const [data, setdata] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [filtered, setfiltered] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filtereddata = data.filter((val) =>
        val.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setfiltered(filtereddata);
    } else {
      setfiltered(data);
    }
  }, [searchText]);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products");
      console.log({ res });
      setdata(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid container gap={2}>
      <Grid item xs={9} container>
        <Input
          placeholder="Search here"
          value={searchText}
          onChange={(e) => setsearchText(e.target.value)}
        />
      </Grid>

      {filtered?.map((val, i) => (
        <Grid
          item
          xs={12}
          md={3}
          flexDirection={"column"}
          //   alignItems={"center"}
          border={"1px solid black"}
          borderRadius={2}
          p={3}
        >
          <Box>
            <b>Title :</b> {val.title}
          </Box>
          <Box>
            <b>Description :</b> {val.description}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Sampledata;
