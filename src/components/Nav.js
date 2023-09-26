import {
  Box,
  Flex,
  Heading,
  ListItem,
  Spacer,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
export const Nav = () => {
  return (
    <Flex display={"flex"} bg={"blue.300"} p={10}>
      <Box>
        <Heading>AutomatedPros Assessment</Heading>
      </Box>
      <Spacer />
      <UnorderedList display={"flex"} gap={10} listStyleType={'none'}>
        <Link to={"/"}>
          <ListItem>Wallet</ListItem>
        </Link>
        <Link to={"/time"}>
          <ListItem>Show time</ListItem>
        </Link>
      </UnorderedList>
    </Flex>
  );
};
