// product-list.js

const products = [
  {
    name: "MacBook Pro",
    description: "Apple.",
    price: "$1,999"
  },
  {
    name: "Samsung Galaxy S24",
    description: "Smartphone Android.",
    price: "$899"
  },
  {
    name: "Sony WH-1000XM5",
    description: "Tai nghe chống ồn.",
    price: "$399"
  }
];

function renderProductList() {
  const container = document.getElementById("product-list");

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <strong>${product.price}</strong>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderProductList);
