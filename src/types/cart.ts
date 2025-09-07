// cart.ts

export interface CartItem {
  id: number;
  name: string;
  price: string; // WooCommerce price is string
  image: string;
  quantity: number;
}

// Get cart from localStorage
export function getCart(): CartItem[] {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

// Save cart to localStorage
export function saveCart(cart: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
export function addToCart(item: CartItem) {
  const cart = getCart();
  const existingItem = cart.find((i) => i.id === item.id);

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCart(cart);

  // Trigger storage event to update Header cart count
  window.dispatchEvent(new Event("storage"));
}
