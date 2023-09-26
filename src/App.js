import { Stack } from "@chakra-ui/react";
import "./App.css";
import WalletConnection from "./components/WalletConnection";
import ShowCurrentTime from "./components/ShowCurrentTime";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Nav } from "./components/Nav";
export const App = () => {
  const [backgroundColor, setBackgroundColor] = useState("#00FF00"); // Initial color

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate color values based on mouse position
      const xPercentage = (e.clientX / window.innerWidth) * 100;
      const yPercentage = (e.clientY / window.innerHeight) * 100;

      // Adjust color values within a certain range
      const red = Math.floor(xPercentage * 2.55); // Ranges from 0 to 255
      const green = Math.floor(yPercentage * 2.55); // Ranges from 0 to 255

      // Generate the background color based on mouse position
      const newColor = `rgb(${red}, ${green}, 0)`;
      setBackgroundColor(newColor);
    };

    // Attach the mousemove event listener
    window.addEventListener("mousemove", handleMouseMove);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Stack bg={backgroundColor} height={"100vh"} overflowX={'hidden'}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<WalletConnection bg={backgroundColor} />} />
          <Route path="/time" element={<ShowCurrentTime />} />
        </Routes>
      </Router>
    </Stack>
  );
};

export default App;
