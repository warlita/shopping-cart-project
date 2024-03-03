
//add to table
$(document).ready(function () {
  $('body').on("click", "#addToCart", function (event) {
    //prevent default is added so when the button is clicked our page is NOT reloading
    event.preventDefault();

    //housing our data obtained from user into new variables
    const item = document.querySelector('.newItem').value;
    const price = document.querySelector('.newPrice').value;
    const quantity = document.querySelector('.newQuantity').value;

    //create a new row for the table
    const newRow = document.createElement('tr');

    //this is the information that will go into the new row
    newRow.innerHTML = `
    <td class="items">${item}</td>
    <td class="prices">${price}</td>
    <td class="quantity">${quantity}</td>
    <td class="totalprice"></td>
    <td class="deleteItem">
    <button class="btn btn-danger">Delete</button>
    </td>
    `;
    //append the new row to the table
    document.querySelector('table').appendChild(newRow);
  });
  //clear the input fields for the user to enter new item
  document.querySelector(".newItem").value = "";
  document.querySelector(".newPrice").value = "";
  document.querySelector(".newQuantity").value = "";
})


// remove button
$(document).ready(function () {
  $("body").on("click", ".deleteItem", function (event) {
    $(this).closest("tr").remove();
  })
});

//calculating subtotal
var calculateSubTotal = function (ele) {
  var quantityItem = Number(`${$(ele).find(".quantity").val()}` || `${$(ele).find(".newQuantity input").val()}`);
  var priceItem = Number(`${$(ele).children(".prices").text().replace(/[^0-9.]+/g, "")}` || `${$(ele).find(".newPrices input").text().replace(/[^0-9.]+/g, "")}`);

  var subTotal = quantityItem * priceItem;

  if (subTotal >= 0) {
    $(ele)
      .children(".totalprice")
      .html(`$${parseFloat(Math.round(subTotal * 100) / 100).toFixed(2)}`);
  }

  return subTotal;
};

//updating Item Price or (subtotal) 
var total = 0;

var updateItemPrice = function () {
  var allItemPrices = [];

  $("tbody tr").each(function (i, ele) {
    var subTotal = calculateSubTotal(this);
    allItemPrices.push(subTotal);
  });

  if (allItemPrices.length == 0) {
    $("#finalPrice").html(`$--.--`);
  } else {
    var totalCart = allItemPrices.reduce(function (acc, x) {
      return acc + x;
    });
    $("#finalPrice").html(totalCart);
  };
};

  //update shopping cart
  var updateTotalCartPrice;
  $("body").on("input", "tr input", function () {
    clearTimeout(updateTotalCartPrice);
    updateTotalCartPrice = setTimeout(function () {
      updateItemPrice();
    }, 500);
  });

