import { Box, Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

const StopWatch = () => {
  const [time, settime] = useState(0);
  const [state, setState] = useState("resume");

  useEffect(() => {
    let interval;
    if (state == "resume") {
      interval = setInterval(() => {
        settime(time + 1);
      }, 1000);
    } else if (state == "start") {
      settime(0);
      setState("resume");
    } else if (state == "pause") {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [state,time]);

  return (
    <Box>
      <Box>{time}</Box>
      <Box>
        <Stack spacing={2} direction={"row"}>
          <Button onClick={() => setState("start")}>start</Button>
          <Button onClick={() => setState("pause")}>pause</Button>
          <Button onClick={() => setState("resume")}>resume</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default StopWatch;
