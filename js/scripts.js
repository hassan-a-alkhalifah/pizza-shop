// BUSINESS LOGIC
// pizza constructor
function Pizza(size) {
  this.pizzaSize = size,
  this.pizzaSauce = "",
  this.pizzaToppings = [],
  this.pizzaTotalCost = 0
}
// prototype to calculate orders total cost based on selected items
Pizza.prototype.calculatePizzaCost = function(hasMeat , quantity) {
  if(this.pizzaSize === "Small") {
    this.pizzaTotalCost += 4;
  } else if(this.pizzaSize === "Medium") {
    this.pizzaTotalCost += 6;
  } else if(this.pizzaSize === "Large") {
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
  var yourPizza;

  $("#pizza-size-form").submit(function(event) {
    event.preventDefault();

    var pizzaSize = $("input:radio[name=pizza-size]:checked").val();
    yourPizza = new Pizza(pizzaSize);
    var pizzaSizeDescription = yourPizza.pizzaSize;
    $(".pizza-size").text("Pizza size: " + pizzaSizeDescription);
    $("#size-choice-container").hide();
    $("#sauce-choice-container").show();
  });

  $("#pizza-sauce-form").submit(function(event) {
    event.preventDefault();

    var pizzaSauce = $("input:radio[name=sauce]:checked").val();
    yourPizza.pizzaSauce = pizzaSauce;
    var pizzaSauceDescription = yourPizza.pizzaSauce;
    $(".sauce-toppings").append(pizzaSauceDescription + ", ");
    $("#sauce-choice-container").hide();
    $("#toppings-choice-container").show();
  });

  $("#pizza-toppings-form").submit(function(event) {
    event.preventDefault();

    $("input[type=checkbox]:checked").each(function(topping) {
      yourPizza.pizzaToppings[topping] = $(this).val();
    });
    var pizzaQuantity = parseInt($("#quantity").val());
    var ifHasMeatTopping = yourPizza.checkingForMeatTopping();
    var totalPrice = yourPizza.calculatePizzaCost(ifHasMeatTopping, pizzaQuantity);
    $(".sauce-toppings").append(yourPizza.pizzaToppings.join(", "));
    $("#total-price").text(totalPrice);
    $(".quantity").text(pizzaQuantity);
    $("#toppings-choice-container").hide();
    $("#current-order-description").hide()
    $("#order-summary-container").show();
    console.log(yourPizza);
  });
});
