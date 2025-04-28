import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { toaster, Toaster } from "../components/ui/toaster";
import React, { useState } from "react";
import { useColorModeValue } from "../components/ui/color-mode";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    console.log("Success: ", success);
    console.log("Message: ", message);

    return { success, message };
  };

  return (
    <Container maxW={"1140px"}>
      <VStack spaceY={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.600")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spaceY={4}>
            <Input
              placeholder="Product Name"
              name="name"
              type="string"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Product Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Product Image"
              name="image"
              type="string"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button
              colorPalette={"blue"}
              variant={"solid"}
              w={"full"}
              onClick={async () => {
                const { success, message } = await handleAddProduct();
                setNewProduct({ name: "", price: "", image: "" });

                if (!success) {
                  toaster.error({
                    title: "Error",
                    description: message,
                    duration: 4000,
                  });
                } else {
                  toaster.success({
                    title: "Success",
                    description: message,
                    duration: 4000,
                  });
                }
              }}
            >
              <Toaster />
              Add product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
