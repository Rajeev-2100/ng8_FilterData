// apiGetLendings.js
import axios from "https://cdn.jsdelivr.net/npm/axios@1.9.0/+esm";

export const apiGetItemDetails = async (id) => {
  try {
    const { data } = await axios.get(`/api/items/${id}`);
    return { error: null, data: data.item };
  } catch (err) {
    return { error: err, data: null };
  }
};
