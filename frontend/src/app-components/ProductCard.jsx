import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useColorModeValue } from "../components/ui/color-mode";
import { toaster, Toaster } from "../components/ui/toaster";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (productId) => {
    const { success, message } = await deleteProduct(productId);
    console.log("Success: ", success);
    console.log("Message: ", message);

    return { success, message };
  };

  const handleUpdateProduct = async (productId, updatedProduct) => {
    const { success, message } = await updateProduct(productId, updatedProduct);
    return { success, message };
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />

      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spaceX={2}>
          {/* Edit */}
          <IconButton aria-label="Edit product" asChild>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button variant="solid" size="sm" colorPalette={"blue"}>
                  <MdEdit />
                </Button>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>{product.name}</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                      <VStack spaceY={4}>
                        <Input
                          placeholder="Product Name"
                          type="string"
                          name="name"
                          value={updatedProduct.name}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              name: e.target.value,
                            })
                          }
                        />
                        <Input
                          placeholder="Product Price"
                          type="number"
                          name="price"
                          value={updatedProduct.price}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              price: e.target.value,
                            })
                          }
                        />
                        <Input
                          placeholder="Image URL"
                          type="string"
                          name="image"
                          value={updatedProduct.image}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              image: e.target.value,
                            })
                          }
                        />
                      </VStack>
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.ActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                      </Dialog.ActionTrigger>
                      <Button
                        colorPalette={"blue"}
                        onClick={async () => {
                          const { success, message } =
                            await handleUpdateProduct(
                              product._id,
                              updatedProduct
                            );

                          if (!success) {
                            toaster.error({
                              title: "Error",
                              description: message,
                              duration: 4000,
                            });
                          } else {
                            toaster.success({
                              title: "Success",
                              description: "Successfully updated product",
                              duration: 4000,
                            });
                          }
                        }}
                      >
                        Update
                      </Button>
                    </Dialog.Footer>
                    <Dialog.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          </IconButton>

          {/* Delete */}
          <IconButton
            colorPalette={"red"}
            aria-label="Delete product"
            onClick={async () => {
              const { success, message } = await handleDeleteProduct(
                product._id
              );

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
            <MdDelete />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
