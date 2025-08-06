// api/apiUpdateItem.js
import axios from "https://cdn.jsdelivr.net/npm/axios@1.9.0/+esm";

export const apiUpdateItem = async (id, attrs) => {
  try {
    const { data } = await axios.put(`/api/items/${id}`, attrs);
    // Mirage returns { item: { … } }
    return { error: null, data: data.item };
  } catch (err) {
    return { error: err, data: null };
  }
};
