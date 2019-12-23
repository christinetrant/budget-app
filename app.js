// Budget Controller Module - IIFE 
let budgetController = (function() {

	// function constructor for expenses and income
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

	return {
		addItem: function(type, des, val) {
			let newItem, ID;
			// unique number that we want to assign to each new item
			// we want the id to be equal to last id + 1 as we will delete items
			//e.g [1,2,4,5] next item id needs to be 6 not 3
			// ID = last id + 1;
			// create new ID
			// select the last element][last id in array + 1 as it is going in the same array
			if(data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}
			// Create new item based on type (inc or exp)
			if(type === 'exp') {
				newItem = new Expense(ID, des, val);
			} else if(type === 'inc') {
				newItem = new Income(ID, des, val);
			}
			// we can push our newItem income or expense into our array into our data structure
			data.allItems[type].push(newItem);
			//return the new element
			return newItem;
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
		let input, newItem;

		// 1. Get the field input data
		input = UICtrl.getInput();
		console.log(input);

		// 2. Add the item to the budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);
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