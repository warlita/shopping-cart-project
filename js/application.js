// calculate cost per item & total
var updateCost = function() {
  var costArr = [];
  $('tbody tr').each(function (i, item) {
    var linePrice = parseFloat($(item).find('.price').text());
    var quantity = parseFloat($(item).find('.qty input').val());
    var itemCost = linePrice * quantity;
    if(quantity) {
      $(item).children('.cost').html(itemCost.toFixed(2));
      costArr.push(itemCost);
    } else {
      $(item).children('.cost').html('');
    }
  });
  var total = costArr.length > 0 ? costArr.reduce((sum, num) => sum + num) : 0;
  $('#grandTotal').html(total.toFixed(2)); 
};

// add item to cart
var addItem = function() {
  var newItem = $('#item').val();
  var newPrice = parseFloat($('#price').val()).toFixed(2);
  if (!newItem || isNaN(newPrice)) {
    alert('You must enter both item name and unit price to add a new item.');
  } else {
    $('#lastRow').before("<tr><td class='item'>" + newItem + "</td><td class='price'>" + newPrice + "</td><td class='qty'><input type='number'></input></td><td class='cost'></td><td><button class='btn btn-danger remove'>Delete</button></td></tr>");  
  }
  $('tr').find('#item, #price').val('');
};

// remove item from cart
var removeItem = function() {
  $(this).closest('tr').remove();
  updateCost();
};

// update cart when quantities change
var updateQty = function () {
  clearTimeout(delay);
  var delay = setTimeout(updateCost, 500);
};

// event handlers
$(document).ready(function() {
  updateCost();
  $(document).on('input', '.qty', updateQty);
  $(document).on('click', '.remove', removeItem);
  $(document).on('click', '.add', addItem);
  $('#price').on('keyup', function(event) {
    if (event.key === 'Enter') {
      addItem();
    }
  });
});
