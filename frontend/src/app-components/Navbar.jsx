import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router";
import { IoIosAdd } from "react-icons/io";
import { ColorModeButton } from "../components/ui/color-mode";

const Navbar = () => {
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "24px", sm: "28px" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip={"text"}
        >
          <NavLink to={"/"}>Product Store 🛒</NavLink>
        </Text>

        <HStack spaceX={2} alignItems={"center"}>
          <NavLink to={"/create"}>
            <IoIosAdd size={25} />
          </NavLink>

          <ColorModeButton />
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
