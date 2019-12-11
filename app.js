// Budget Controller Module - IIFE 
let budgetController = (function() {

	let x = 23;

	let add = function(a) {
		return x+a;
	}

	// This returns the method below which can be accessed outside of budgetController - the method below can always access the methods above due to closures.  
	return {
		publicTest: function(b) {
			return add(b);
		}
	}
})();

// UI Controller Module - IIFE
let UIController = (function() {

	//code in here

})();

// App Controller Module - IIFE
// Call 2 parameters in the function for the above 2 functions
let controller = (function(budgetCtrl, UICtrl) {
	
	let z = budgetCtrl.publicTest(5);

	return {
		anotherPublic: function() {
			console.log(z);
		}
	}

})(budgetController, UIController);