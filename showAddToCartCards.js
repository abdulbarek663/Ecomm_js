import products from "./src/api/products.json";
import { getCartProductFromLS } from "./getCartProducts";
import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS";
import { removeProdFromCart } from "./removeProdFromCart";
import { incrementDecrement } from "./incrementDecrement";
import { updateCartProductTotal } from "./updateCartProductTotal";

let cartProducts = getCartProductFromLS();

let filterProducts = products.filter((curProd) => {
  return cartProducts.some((curElem) => curElem.id === curProd.id);
  //return cartProducts.includes(curProd.id);
  //   console.log(curProd.id);
  //   console.log(cartProducts.id);
  //   console.log(curProd);
});
//console.log(filterProducts);

// update addToCart page

const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");

//show cartProduct
const showCartProduct = () => {
  filterProducts.forEach((curProd) => {
    const { category, id, image, name, stock, price } = curProd;

    let productClone = document.importNode(templateContainer.content, true);

    productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);

    productClone.querySelector(".category").textContent = category;
    productClone.querySelector(".productName").textContent = name;
    productClone.querySelector(".productImage").src = image;

    const lSActualData = fetchQuantityFromCartLS(id, price);

    productClone.querySelector(".productQuantity").textContent =
      lSActualData.quantity;
    productClone.querySelector(".productPrice").textContent =
      lSActualData.price;

    // increment and decrement handiling
    productClone
      .querySelector(".stockElement")
      .addEventListener("click", (event) => {
        //console.log(event.target);
        incrementDecrement(event, id, stock, price);
      });

    // remove button handiling

    productClone
      .querySelector(".remove-to-cart-button")
      .addEventListener("click", () => removeProdFromCart(id));

    cartElement.appendChild(productClone);
  });
};

showCartProduct();

updateCartProductTotal();
