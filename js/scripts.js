// BUSINESS LOGIC
// pizza constructor
function Pizza(name) {
  this.customerName = name;
  this.pizzaSize = "",
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

  $("#customer-name-form").submit(function(event) {
    event.preventDefault();

    var customerName = $("#customer-name-input").val();
    yourPizza = new Pizza(customerName);
    $("#home-page-container").hide();
    $("#size-choice-container").show();
  });
  // click event of pizza size page to provide focused colors to chosen size to allow user to know which option was chosen
  $(".pizza").click(function() {
    $(".pizza").removeClass("chosen");
    $(this).addClass("chosen");
  });

  // submit event to take users pizza size and store in object. Also to hide current container and reveal pizza sauce container
  $("#pizza-size-form").submit(function(event) {
    event.preventDefault();

    var pizzaSize = $("input:radio[name=pizza-size]:checked").val();
    yourPizza.pizzaSize = pizzaSize;
    $(".pizza-size").text("Pizza size: " + yourPizza.pizzaSize);
    $("#size-choice-container").hide();
    $("#sauce-choice-container").show();
  });

  // submit event to take users sauce choice and store in object. Also to hide current container and reveal pizza toppings container
  $("#pizza-sauce-form").submit(function(event) {
    event.preventDefault();

    var pizzaSauce = $("input:radio[name=sauce]:checked").val();
    yourPizza.pizzaSauce = pizzaSauce;
    var pizzaSauceDescription = yourPizza.pizzaSauce;
    $(".sauce-toppings").append(pizzaSauceDescription + ", ");
    $("#sauce-choice-container").hide();
    $("#toppings-choice-container").show();
  });

  // submit event to take users toppings choice and store in object. Also to hide current container and reveal order summary container. As well to provide provide total order value to customer
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
    $("#customer-name").text(yourPizza.customerName);
    $("#toppings-choice-container").hide();
    $("#current-order-description").hide()
    $("#order-summary-container").show();
  });
});
