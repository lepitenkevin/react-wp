// src/api/wooApi.ts
import type { WCProduct } from "../types/types";

const BASE_URL = "https://kevinlepiten.com/blog/woo-api/woocommerce-api.php";

export async function fetchWooData<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}?endpoint=${endpoint}`);
    if (!response.ok) {
      throw new Error(`WooCommerce API error: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("WooCommerce API fetch error:", error);
    throw error;
  }
}

// Example specific helper for products
export function fetchProducts(): Promise<WCProduct[]> {
  return fetchWooData<WCProduct[]>("products");
}
