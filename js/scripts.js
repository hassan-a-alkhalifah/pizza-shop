// Business logic
function Pizza(size) {
  this.pizzaSize = size,
  this.pizzaSauce = "",
  this.pizzaToppings = [],
  this.pizzaTotalCost = 0
}

Pizza.prototype.calculatePizzaCost = function(hasMeat) {
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
}

Pizza.prototype.checkingForMeatTopping = function() {
  for(var i = 0; i < 1; i++) {
    console.log(i);
    if(this.pizzaToppings[i] === "pepperoni" || this.pizzaToppings[i] === "ham" || this.pizzaToppings[i] === "chicken" || this.pizzaToppings[i] === "italian sausage" || this.pizzaToppings[i] === "bacon") {
      return true;
    }
  }
}
// UI logic
$(document).ready(function() {
  var yourPizza;
  $("#pizza-size-form").submit(function(event) {
    event.preventDefault();

    var pizzaSize = $("input:radio[name=pizza-size]:checked").val();
    yourPizza = new Pizza(pizzaSize);
    $("#size-choice-container").hide();
    $("#sauce-choice-container").show();
  });

  $("#pizza-sauce-form").submit(function(event) {
    event.preventDefault();

    var pizzaSauce = $("input:radio[name=sauce]:checked").val();
    yourPizza.pizzaSauce = pizzaSauce;
    $("#sauce-choice-container").hide();
    $("#toppings-choice-container").show();
  });

  $("#pizza-toppings-form").submit(function(event) {
    event.preventDefault();

    $("input[type=checkbox]:checked").each(function(topping) {
      yourPizza.pizzaToppings[topping] = $(this).val();
    });
    $("#toppings-choice-container").hide();
    $("#order-summary-container").show();
    var ifHasMeatTopping = yourPizza.checkingForMeatTopping();
    yourPizza.calculatePizzaCost(ifHasMeatTopping);
    console.log(yourPizza);
  });
});
