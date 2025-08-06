// apiDeleteLending.js
import axios from "https://cdn.jsdelivr.net/npm/axios@1.9.0/+esm";

export const apiDeleteItem = async (id) => {
  try {
    const { data } = await axios.delete(`/api/items/${id}`);
    return { error: null, data };
  } catch (err) {
    return { error: err, data: null };
  }
};
