// apiAddItem.js
import axios from "https://cdn.jsdelivr.net/npm/axios@1.9.0/+esm";

export const apiAddItem = async (newItem) => {
  try {
    const { data } = await axios.post("/api/items", newItem);
    // Mirage returns the created record under "item"
    return { error: null, data: data.item };
  } catch (err) {
    return { error: err, data: null };
  }
};
