import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { Stack, Card, CardBody, Heading, Text, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BsCheckCircle } from "react-icons/bs";

function WalletConnection({ bg }) {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [maxConsecutiveChars, setMaxConsecutiveChars] = useState("");

  useEffect(() => {
    const connectToMetaMask = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const connectedAccounts = await web3Instance.eth.getAccounts();
          setWeb3(web3Instance);
          setAccounts(connectedAccounts);
          analyzeAddress(connectedAccounts[0]); // Analyze the first connected account
        } catch (error) {
          console.error(error);
        }
      }
    };

    // Function to find the Highest consecutive character
    const analyzeAddress = (address) => {
      let maxChar = "";
      let maxCount = 0;
      let currentChar = "";
      let currentCount = 0;

      for (let i = 0; i < address.length; i++) {
        if (address[i] === currentChar) {
          currentCount++;
        } else {
          currentChar = address[i];
          currentCount = 1;
        }

        if (currentCount > maxCount) {
          maxCount = currentCount;
          maxChar = currentChar;
        }
      }

      // Log the results
      console.log(`Max Consecutive Character: ${maxChar}`);
      console.log(`Max Consecutive Count: ${maxCount}`);

      // Set the result in the state
      setMaxConsecutiveChars(maxChar.repeat(maxCount));
    };

    connectToMetaMask();
  }, []);

  return (
    <Stack padding={"20"} bg={bg}>
      <motion.div
        initial={{ opacity: 0, y: "-170" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card p={"40"}>
          {web3 ? (
            <div>
              <Heading display={"flex"}>
                <Box mt={2} mr={2} color={"green"}>
                  <BsCheckCircle size={32} />
                </Box>
                Connected Wallet Address:
              </Heading>
              <ul>
                {accounts.map((address, index) => (
                  <Text fontSize={"xl"} color={"green"} key={index}>
                    {address}
                  </Text>
                ))}
              </ul>
              <Text fontSize={"xl"}>
                Highest Consecutive Character(s):{" "}
                <Text as={"span"} color={"green"}>
                  {maxConsecutiveChars}
                </Text>
              </Text>
            </div>
          ) : (
            <p>MetaMask not detected or not connected.</p>
          )}
        </Card>
      </motion.div>
    </Stack>
  );
}

export default WalletConnection;
