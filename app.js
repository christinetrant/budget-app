// Budget Controller Module - IIFE 
let budgetController = (function() {

	// function constructord for expenses and income
	let Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	}

	let Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	}


	// let allExpenses = [];
	// let allIncomes = [];
	// let totalIncome = 0;
	// let totalExpenses = 0;
	let data = {
		allItems: {
			exp: [],
			inc: [],
		},
		totals: {
			exp: 0,
			inc: 0,			
		},
	}

})();




// UI Controller Module - IIFE
let UIController = (function() {
	//private variable
	let DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
	}
	// Public method so needs to be returned in object
	return {
		getInput: function() {
			return {
				type: document.querySelector(DOMstrings.inputType).value, //Will be either inc or exp as it is a select dropdown
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: document.querySelector(DOMstrings.inputValue).value,
			}
		},
		// returns DOMstrings so they can be accessed publicly
		getDomstrings: function() {
			return DOMstrings;
		}
	}


})();




// App Controller Module - IIFE
// Call 2 parameters in the function for the above 2 functions
let controller = (function(budgetCtrl, UICtrl) {
	// Setting up event listeners within a function to keep it clean
	let setupEventListeners = function() {
		//we need to access DOMstrings from UI Controller
		let DOM = UICtrl.getDomstrings();
		// set up event listeners for add button or when enter is pressed.
		document.querySelector(DOM.inputBtn).addEventListener('click', controlAddItem);
		document.addEventListener('keypress', function(event) {
			// Number 13 is the "Enter" key on the keyboard
			if (event.keyCode === 13 || event.which === 13) {
				controlAddItem();
			}
		});
	};
	


	let controlAddItem = function() {
		// To do list when item is added:

		// 1. Get the field input data
		let input = UICtrl.getInput();
		console.log(input);

		// 2. Add the item to the budget controller
		
		// 3. Add the new item to the User Interface
		
		// 4. Calculate the budget
		
		// 5. Display the budget on the UI

		console.log('It works!');
	};

	return {
		// initialisation
		init: function() {
			console.log('init function has started');
			setupEventListeners();
		}
	};

})(budgetController, UIController);

// runs initialise function
controller.init();