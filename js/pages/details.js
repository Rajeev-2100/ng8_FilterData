import { apiGetItemDetails } from "../api/apiGetItemDetails.js";
import { apiDeleteItem } from "../api/apiDeleteItem.js";
import { apiUpdateItem } from "../api/apiUpdateItem.js";

function getHash() {
  const hash = window.location.hash.replace("#", "");
  return Number(hash);
}

const lowStockThreshold = 5;

function lowStockAnalysis(stock) {
  if (stock == 0) {
    return "out-of-stock";
  } else if (stock < lowStockThreshold) {
    return "low-stock";
  }
}

function ItemDetails(items) {
  return `<article>
        <header>
            <h2>${items.name}</h2>
        </header>
            <p>Category: ${items.category}</p>
            <p>Stock: <span class=${lowStockAnalysis(
              items.stock
            )} id="stock-item">${items.stock}</span></p>
        <footer>
            <button id="restock-item">Restock</button>
            <button id="delete-item" class="secondary outline">Remove</button>
        </footer>
    </article>`;
}

function ErrorBanner(error) {
  return `<hgroup>
            <h2>Error Loading Product</h2>
            <p>${error.message}</p>
    </hgroup>`;
}

function ItemDeleteSuccessfully() {
  return `<hgroup>
      <h2>Item Deleted</h2>
      <p>The Item has been successfully deleted.</p>
      <a href="/">Back to home</a>
  </hgroup>`;
}

async function deleteItem() {
  const id = getHash();
  const { error } = await apiDeleteItem(id);

  if (error) {
    document.getElementById("app").innerHTML = ErrorBanner(error);
    return;
  }

  document.getElementById("app").innerHTML = ItemDeleteSuccessfully();
}

async function restockItem() {
  const id = getHash();

  const { error, data } = await apiGetItemDetails(id);

  if (error) {
    document.getElementById("app").innerHTML = ErrorBanner(error);
    return;
  }

  const newStock = Number(data.stock) + 1;

  const { error: updateError, data: updateItem } = await apiUpdateItem(id, {
    stock: newStock,
  });

  if (updateError) {
    document.getElementById("app").innerHTML = ErrorBanner(updateError);
    return;
  }

  const stockElement = document.getElementById("stock-item");
  stockElement.innerText = `${updateItem.stock}`;

  if (stockElement.textContent > 0 && stockElement.textContent < 5) {
    stockElement.style.color = "yellow";
  } else if (stockElement.textContent > 4) {
    stockElement.style.color = "white";
  } else {
    stockElement.style.color = "red";
  }
}

function attachButtonHandler() {
  const removeButton = document.getElementById("delete-item");
  const restockButtonElement = document.getElementById("restock-item");

  removeButton.addEventListener("click", deleteItem);
  restockButtonElement.addEventListener("click", restockItem);
}

export default async function render() {
  const id = getHash();
  const { error, data } = await apiGetItemDetails(id);

  if (error) {
    document.getElementById("app").innerHTML = ErrorBanner(error);
    return;
  }

  document.getElementById("app").innerHTML = ItemDetails(data);
  attachButtonHandler();
}
