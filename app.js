// Budget Controller Module - IIFE 
let budgetController = (function() {

	// some code

})();




// UI Controller Module - IIFE
let UIController = (function() {

	// Public method so needs to be returned in object
	return {
		getInput: function() {
			return {
				type: document.querySelector('.add__type').value, //Will be either inc or exp as it is a select dropdown
				description: document.querySelector('.add__description').value,
				value: document.querySelector('.add__value').value,
			}
		}
	}


})();




// App Controller Module - IIFE
// Call 2 parameters in the function for the above 2 functions
let controller = (function(budgetCtrl, UICtrl) {

	const controlAddItem = function() {
		// To do list when item is added:

		// 1. Get the field input data
		let input = UICtrl.getInput();
		console.log(input);

		// 2. Add the item to the budget controller
		
		// 3. Add the new item to the User Interface
		
		// 4. Calculate the budget
		
		// 5. Display the budget on the UI

		console.log('It works!');
	}
	
	// set up event listeners for add button or when enter is pressed.
	document.querySelector('.add__btn').addEventListener('click', controlAddItem);
	document.addEventListener('keypress', function(event) {
		// Number 13 is the "Enter" key on the keyboard
		if (event.keyCode === 13 || event.which === 13) {
			controlAddItem();
		}

	});

})(budgetController, UIController);