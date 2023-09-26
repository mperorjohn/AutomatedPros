import { Button, Card, Container, Heading, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
const ShowCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    // Update the component render count whenever the state changes
    setRenderCount(renderCount + 1);
  }, [currentTime, clickCount]);

  const handleShowTimeClick = () => {
    // Get the current time
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();

    // Update the state to display the current time
    setCurrentTime(formattedTime);

    // Log the click count
    console.log(`Button clicked ${clickCount + 1} times`);

    // Update the click count
    setClickCount(clickCount + 1);
  };

  return (
    <Container
      p={20}
      width={"100%"}
      mt={20}
      bg={"blue.200"}
      color={"white"}
      gap={6}
    >
      <motion.div
        initial={{ opacity: 0, y: "-170" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card p={20}>
          <Heading>Show Time</Heading>
          <Text color={"blue.200"} fontWeight={"bold"}>
            Rendered: {renderCount} times
          </Text>
          <Button bg={"blue.200"} onClick={handleShowTimeClick}>
            Show Current Time
          </Button>
          {currentTime && <p>Current Time: {currentTime}</p>}
        </Card>
      </motion.div>
    </Container>
  );
};

export default ShowCurrentTime;
