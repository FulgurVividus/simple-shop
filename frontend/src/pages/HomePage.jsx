import { Container, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { NavLink } from "react-router";
import { useProductStore } from "../store/product";
import ProductCard from "../app-components/ProductCard";

const HomePage = () => {
  const { products, fetchProducts } = useProductStore();

  useEffect(
    function () {
      fetchProducts();
    },
    [fetchProducts]
  );

  return (
    <Container maxW={"1140px"}>
      <VStack spaceY={8}>
        <Text
          fontSize={{ base: "20px", sm: "24px" }}
          fontWeight={"bold"}
          textAlign={"center"}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip={"text"}
        >
          Current Products 🚀
        </Text>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          rowGap={10}
          columnGap={10}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {/* No product cards */}
        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No products found 😢{" "}
            <NavLink to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </NavLink>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
