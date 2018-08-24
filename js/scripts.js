// Business logic
function Pizza(size) {
  this.pizzaSize = size,
  this.pizzaSauce = "",
  this.pizzaToppings = [],
  this.pizzaTotalCost = 0
}

Pizza.prototype.calculatePizzaCost = function() {

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
    console.log(pizzaSize);
  });

  $("#pizza-sauce-form").submit(function(event) {
    event.preventDefault();

    var pizzaSauce = $("input:radio[name=sauce]:checked").val();
    yourPizza.pizzaSauce = pizzaSauce;
    $("#sauce-choice-container").hide();
    $("#toppings-choice-container").show();
    console.log(yourPizza.pizzaSauce);
    console.log(yourPizza);
  });

  $("#pizza-toppings-form").submit(function(event) {
    event.preventDefault();

    $("input[type=checkbox]:checked").each(function(topping) {
      yourPizza.pizzaToppings[topping] = $(this).val();
    });
    $("#toppings-choice-container").hide();
    $("#order-summary-container").show();
    console.log(yourPizza.pizzaToppings);
    console.log(yourPizza);
  });
});
