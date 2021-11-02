function calc (form) {
     var C, P, F 
     
    C=parseInt(document.getElementById("carb-per").value)/100
    P=parseInt(document.getElementById("protien-per").value)/100
	F=parseInt(document.getElementById("fat-per").value)/100
	const val = (C + P + F).toFixed(2);
	if (val != 1.00) { 
		alert('The sum of carb, protein, and fat percentage must equal 100');
		form.CarbCalories.value = 0;
		form.ProteinCalories.value = 0;
		form.FatCalories.value = 0;

		form.CarbGrams.value = 0;
		form.ProteinGrams.value = 0;
		form.FatGrams.value = 0;
	}
	else{
		const targetCalories = parseInt(document.getElementById("targetCalories").value);

		form.CarbCalories.value = C * targetCalories;
		form.ProteinCalories.value = P * targetCalories;
		form.FatCalories.value = F * targetCalories;

		form.CarbGrams.value = Math.round((C * targetCalories)/4);
		form.ProteinGrams.value = Math.round((P * targetCalories)/4);
		form.FatGrams.value = Math.round((F * targetCalories)/9); 
	}
}

/*
Dairy 
Veg 
Non Veg
Nuts
seeds 
millets

*/
function AddDropDownList() {
	//Build an array containing Customer records.
	var category = [
		{Name:"Dairy"},
		{Name:"Veg"},
		{Name:"Non Veg"},
		{Name:"Nuts"},
		{Name:"Seeds"},
		{Name:"Millets"},
	];
	var customers = [
		{ CustomerId: 1, Name: "John Hammond", Country: "United States" },
		{ CustomerId: 2, Name: "Mudassar Khan", Country: "India" },
		{ CustomerId: 3, Name: "Suzanne Mathews", Country: "France" },
		{ CustomerId: 4, Name: "Robert Schidner", Country: "Russia" }
	];
	//Create a DropDownList element.
	var ddlCustomers = document.createElement("SELECT");

	//Add the Options to the DropDownList.
	for (var i = 0; i < category.length; i++) {
		var option = document.createElement("OPTION");

		//Set Customer Name in Text part.
		option.innerHTML = category[i].Name;

		//Set CustomerId in Value part.
		//Add the Option element to DropDownList.
		ddlCustomers.options.add(option);
	}

	// for (var i = 0; i < customers.length; i++) {
	// 	var option = document.createElement("OPTION");

	// 	//Set Customer Name in Text part.
	// 	option.innerHTML = customers[i].Name;
	// 	option.innerHTML = customers[i].Country;

	// 	//Set CustomerId in Value part.
	// 	option.value = customers[i].CustomerId;


	// 	//Add the Option element to DropDownList.
	// 	ddlCustomers.options.add(option);
	// }

	//Reference the container DIV.
	var dvContainer = document.getElementById("dvContainer")

	//Add the DropDownList to DIV.
	var div = document.createElement("DIV");
	div.appendChild(ddlCustomers);

	//Create a Remove Button.
	var btnRemove = document.createElement("INPUT");
	btnRemove.value = "Remove";
	btnRemove.type = "button";
	btnRemove.onclick = function () {
		dvContainer.removeChild(this.parentNode);
	};

	//Add the Remove Buttton to DIV.
	div.appendChild(btnRemove);

	//Add the DIV to the container DIV.
	dvContainer.appendChild(div);
}
