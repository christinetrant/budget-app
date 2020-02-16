// Budget Controller Module - IIFE 
let budgetController = (function() {

	// function constructor for expenses and income
	let Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	let Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	// the data in allItems below will either be of type inc or exp
	let calculateTotal = function(type) {
		var sum = 0;
		// for each current element we want to add to total
		data.allItems[type].forEach(function(current) {
			sum += current.value;
		});
		data.totals[type] = sum;
	};

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
		budget: 0,
		percentage: -1
	};

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

		//Calculate total income & expenses
		calculateBudget: function() {
			calculateTotal('exp');
			calculateTotal('inc');

			//calculate the budget: income - expenses
			data.budget = data.totals.inc - data.totals.exp;

			//Calculate the percentage of income that we spent
			if(data.totals.inc > 0) {
				// round to nearest integer
				data.percentage = Math.round((data.totals.exp / data.totals.inc)*100);
			} else {
				// we only want a percentage if totals includes an income
				data.percentage = -1; 
			}
		},

		getBudget: function() {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage,
			}
		},

		testing: function() {
    	console.log(data);
    }
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
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expensesLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage',
		container: '.container',
	}
	// Public method so needs to be returned in object
	return {
		getInput: function() {
			return {
				type: document.querySelector(DOMstrings.inputType).value, //Will be either inc or exp as it is a select dropdown
				description: document.querySelector(DOMstrings.inputDescription).value,
				// We want the value inputted to be saved as a number in the object so use parseFloat
				value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
			}
		},
		addListItem: function(obj, type) {
			let html, newHtml, element;
			// Create HTML string with placeholder text
			if(type === 'inc') {
				element = DOMstrings.incomeContainer;

				html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
			} else if(type === 'exp') {
				element = DOMstrings.expensesContainer;
				
				html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
			}

			// Replace the placeholder text with actual data
			newHtml = html.replace('%id%', obj.id);
			//use newHtml to replace below as we have already started it
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);

			// Insert HTML into the DOM
			// https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
		},

		// clear the input fields
		clearFields: function() {
			let fields, fieldsArr;
		
			// we want to clear both input fields - Description & Value
			fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
			// we want to use the forEach loop but it only works on arrays so we use the Array.prototype to 'trick' fields to be viewed as an array - https://medium.com/@andrewsburke/array-prototype-slice-call-arguments-a94b04e74a4
			fieldsArr = Array.prototype.slice.call(fields);
			// We call on our new fieldsArray to clear the fields
			// https://www.w3schools.com/jsref/jsref_foreach.asp
			fieldsArr.forEach(function(current, index, array) {
				current.value = "";
			});

			// Adds the css focus element to description box once cleared
			fieldsArr[0].focus();
		},

		// Display budget function
		displayBudget: function(obj) {
			document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
			document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
			document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
			document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;

			if(obj.percentage > 0) {
				document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + "%";
			} else {
				document.querySelector(DOMstrings.percentageLabel).textContent = "---";
			}
		},

		// returns DOMstrings so they can be accessed publicly
		getDomstrings: function() {
			return DOMstrings;
		},
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
		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
		// find a common parent for income & expenses so when delete button is clicked we can delete item:
		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
		document.addEventListener('keypress', function(event) {
			// Number 13 is the "Enter" key on the keyboard
			if (event.keyCode === 13 || event.which === 13) {
				ctrlAddItem();
			}
		});
	};
	
	let updateBudget = function() {
		// 1. Calculate the budget
		budgetCtrl.calculateBudget();
		// 2. Return the budget
		let budget = budgetCtrl.getBudget();
		// 3. Display the budget on the UI
		UICtrl.displayBudget(budget);
		//console.log(budget);
	};

	let ctrlAddItem = function() {
		// To do list when item is added:
		let input, newItem;

		// 1. Get the field input data
		input = UICtrl.getInput();

		// To prevent empty lines being added we need to make sure there is data inputted!
		if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
			// 2. Add the item to the budget controller
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);

			// 3. Add the new item to the User Interface
			UICtrl.addListItem(newItem, input.type);

			// 4. Clear the fields
			UICtrl.clearFields();

			//5. Calculate & update budget
			updateBudget();
		}
	};

	let ctrlDeleteItem = function(event) {
		console.log(event.target);
	};

	return {
		// initialisation
		init: function() {
			console.log('init function has started');
			//Everything on UI should be zero when init function runs
			UICtrl.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1,
			});

			setupEventListeners();
		}
	};

})(budgetController, UIController);

// runs initialise function
controller.init();