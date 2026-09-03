// Centralized API client for communicating with the Node.js / Express backend
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

export async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (err) {
    console.error("API error fetching products:", err);
    return null;
  }
}

export async function fetchEvents() {
  try {
    const res = await fetch(`${API_BASE}/events`);
    if (!res.ok) throw new Error("Failed to fetch events");
    return await res.json();
  } catch (err) {
    console.error("API error fetching events:", err);
    return null;
  }
}

export async function fetchOrders() {
  try {
    const res = await fetch(`${API_BASE}/orders`);
    if (!res.ok) throw new Error("Failed to fetch orders");
    return await res.json();
  } catch (err) {
    console.error("API error fetching orders:", err);
    return null;
  }
}

export async function createOrder(orderData) {
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData)
    });
    if (!res.ok) throw new Error("Failed to create order");
    return await res.json();
  } catch (err) {
    console.error("API error creating order:", err);
    return null;
  }
}

export async function updateOrderStatus(orderId, status) {
  try {
    const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error("Failed to update order status");
    return await res.json();
  } catch (err) {
    console.error("API error updating status:", err);
    return null;
  }
}

export async function createReservation(reservationData) {
  try {
    const res = await fetch(`${API_BASE}/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservationData)
    });
    if (!res.ok) throw new Error("Failed to create reservation");
    return await res.json();
  } catch (err) {
    console.error("API error creating reservation:", err);
    return null;
  }
}

export async function fetchInventory() {
  try {
    const res = await fetch(`${API_BASE}/inventory`);
    if (!res.ok) throw new Error("Failed to fetch inventory");
    return await res.json();
  } catch (err) {
    console.error("API error fetching inventory:", err);
    return null;
  }
}

export async function fetchCustomers() {
  try {
    const res = await fetch(`${API_BASE}/customers`);
    if (!res.ok) throw new Error("Failed to fetch customers");
    return await res.json();
  } catch (err) {
    console.error("API error fetching customers:", err);
    return null;
  }
}

export async function fetchReservations() {
  try {
    const res = await fetch(`${API_BASE}/reservations`);
    if (!res.ok) throw new Error("Failed to fetch reservations");
    return await res.json();
  } catch (err) {
    console.error("API error fetching reservations:", err);
    return null;
  }
}
