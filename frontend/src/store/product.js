import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  //
  setProducts: (products) => set({ products: products }),
  //
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields." };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));

    return { success: true, message: "Product created successfully" };
  },
  //
  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error(`Error in fetching products: ${error}`);
    }
  },
  //
  deleteProduct: async (productId) => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      // update the ui
      set((state) => ({
        products: state.products.filter((p) => p._id !== productId),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error(`Error in deleting product: ${error}`);
    }
  },
  //
  updateProduct: async (productId, updatedProduct) => {
    const res = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    set((state) => ({
      products: state.products.map((product) =>
        product._id === productId ? updatedProduct : product
      ),
    }));

    return { success: true, message: data.message };
  },
}));
