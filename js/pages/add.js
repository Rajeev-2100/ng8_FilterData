import { apiAddItem } from "../api/apiAddItem.js";

function AddForm(data) {
  return `
  <h2>Add New Warehouse Item</h2>
  <hr>
    <form id="formDetails">
        <label for="item-name">Item name:</label>
        <input type="text" id="item-name" placeholder="Enter item name">
        <label for="item-category">Category:</label>
        <select id="item-category">
            <option value="none" disabled selected>Select Category</option>
            <option value="electronic">Electronics</option>
            <option value="home">Home</option>
            <option value="kitchen">Kitchen</option>
            <option value="other">Other</option>
        </select>
        <label for="item-stock">Item name:</label>
        <input type="number" id="item-stock" placeholder="0">
        <br><br>
        <button type="submit">Add Item</button>
    </form>

    <div id="result"></div>
    `;
}

async function handleSubmit(event) {
  event.preventDefault();

  const payLoad = {
    name: document.getElementById("item-name").value,
    category: document.getElementById("item-category").value,
    stock: document.getElementById("item-stock").value,
  };

  const result = document.getElementById("result");

  const { error } = await apiAddItem(payLoad);

  const form = document.getElementById("formDetails");

  if (payLoad.stock < 0) {
    alert("Enter the Value above then 0");
    form.reset()
  } else if (!error) {
    result.innerHTML = `<p>Item added successfully.</p>`;
    result.style.color = "green";
    form.reset();
  } else if(error) {
    result.innerText = "Error adding data wrong";
    result.style.color = "red";
  }
}

export default async function render() {
  document.getElementById("app").innerHTML = AddForm();

  const form = document.getElementById("formDetails");
  form.addEventListener("submit", handleSubmit);
}
