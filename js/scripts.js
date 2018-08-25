// BUSINESS LOGIC
// pizza constructor
function Pizza(name) {
  this.customerName = name;
  this.pizzaSize = "",
  this.pizzaSauce = "",
  this.pizzaToppings = [],
  this.pizzaTotalCost = 0
}
// prototype to calculate order's total cost based on selected items
Pizza.prototype.calculatePizzaCost = function(hasMeat , quantity) {
  if(this.pizzaSize === "Small") {
    this.pizzaTotalCost += 4;
  } else if(this.pizzaSize === "Medium") {
    this.pizzaTotalCost += 6;
  } else {
    this.pizzaTotalCost += 8;
  }

  if(this.pizzaSauce === "bbq sauce") {
    this.pizzaTotalCost += 2;
  } else if(this.pizzaSauce === "garlic parmesan sauce") {
    this.pizzaTotalCost += 2;
  }

  if(hasMeat === true) {
    this.pizzaTotalCost += 2;
  }

  return this.pizzaTotalCost * quantity;
}
// prototype to check is a meat topping was selected
Pizza.prototype.checkingForMeatTopping = function() {
  for(var i = 0; i < 1; i++) {
    console.log(i);
    if(this.pizzaToppings[i] === "pepperoni" || this.pizzaToppings[i] === "ham" || this.pizzaToppings[i] === "chicken" || this.pizzaToppings[i] === "italian sausage" || this.pizzaToppings[i] === "bacon") {
      return true;
    } else {
      return false;
    }
  }
}

// UI lOGIC
$(document).ready(function() {
  var customerPizza;

  $("#customer-name-form").submit(function(event) {
    event.preventDefault();

    var customerName = $("#customer-name-input").val();
    customerPizza = new Pizza(customerName);
    $("#home-page-container").hide();
    $("#size-choice-container").show();
  });
  // click event for pizza size page to provide focused colors to chosen size to allow user to know which option was chosen
  $(".pizza").click(function() {
    $(".pizza").removeClass("chosen");
    $(this).addClass("chosen");
  });

  // submit event to take user's pizza size and store in current object. Also to hide current container and reveal pizza sauce container
  $("#pizza-size-form").submit(function(event) {
    event.preventDefault();

    var pizzaSize = $("input:radio[name=pizza-size]:checked").val();
    customerPizza.pizzaSize = pizzaSize;
    $(".pizza-size").text("Pizza size: " + customerPizza.pizzaSize);
    $("#size-choice-container").hide();
    $("#sauce-choice-container").show();
  });

  // submit event to take user's sauce choice and store in object. Also to hide current container and reveal pizza toppings container
  $("#pizza-sauce-form").submit(function(event) {
    event.preventDefault();

    var pizzaSauce = $("input:radio[name=sauce]:checked").val();
    customerPizza.pizzaSauce = pizzaSauce;
    var pizzaSauceDescription = customerPizza.pizzaSauce;
    $(".sauce-toppings").append(pizzaSauceDescription + ", ");
    $("#sauce-choice-container").hide();
    $("#toppings-choice-container").show();
  });

  // submit event to take user's toppings choice and store in object. Also to hide current container and reveal order summary container. As well to provide total order value to customer in message
  $("#pizza-toppings-form").submit(function(event) {
    event.preventDefault();

    $("input[type=checkbox]:checked").each(function(topping) {
      customerPizza.pizzaToppings[topping] = $(this).val();
    });
    var pizzaQuantity = parseInt($("#quantity").val());
    var ifHasMeatTopping = customerPizza.checkingForMeatTopping();
    var totalPrice = customerPizza.calculatePizzaCost(ifHasMeatTopping, pizzaQuantity);
    $(".sauce-toppings").append(customerPizza.pizzaToppings.join(", "));
    $("#total-price").text(totalPrice);
    $(".quantity").text(pizzaQuantity);
    $("#customer-name").text(customerPizza.customerName);
    $("#toppings-choice-container").hide();
    $("#current-order-description").hide()
    $("#order-summary-container").show();
  });
});
