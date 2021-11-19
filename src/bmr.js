
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
		{Name:"Non_Veg"},
		{Name:"Nuts"},
		{Name:"Seeds"},
		{Name:"Millets"},
	];
	const sel = document.getElementById("select-source").value;

	console.log(sel);

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

	//Reference the container DIV.
	var dvContainer = document.getElementById("dvContainer");
	// var selval = document.createElement("P");
	// selval.innerHTML = sel;
	// dvContainer.appendChild(selval);
	var cat;
	//console.log(sel)
	if(sel==="Dairy"){
		//console.log(category_dairy);
		cat = category_dairy
	}
	else if(sel==="Nuts")
	{
		//console.log(category_nuts)
		cat = category_nuts
	}
	else if(sel==="Veg"){
		//console.log(category_veg)
		cat = category_veg
	}
	else if(sel==="Millets"){
		//console.log(category_millets)
		cat = category_millets
	}
	else if(sel=="Seeds"){
		//console.log(category_seeds)
		cat = category_seeds
	}
	else{
		//console.log(category_non_veg)
		cat = category_non_veg
	}
	console.log(cat);
	var selcat = document.createElement("SELECT");

	//Add the Options to the DropDownList.
	for (var i = 0; i < cat.length; i++) {
		var option = document.createElement("OPTION");

		//Set Customer Name in Text part.
		option.innerHTML = cat[i].Name;

		//Set CustomerId in Value part.
		//Add the Option element to DropDownList.
		selcat.options.add(option);
	}
	// {Name:"Sunflower", Quantity:10, cal:63,c:1,p:2,f:2.4},
	
	var resval = document.createElement("P");
	var res = toString(cat.Quantity) + toString(cat.cal)+ toString(cat.c) + toString(cat.p) + toString(cat.f)
	resval.innerHTML = "Cat"//res;

	console.log(selcat.value)
	console.log(cat.Quantity)
	console.log(cat.cal)
	console.log(cat.c)
	console.log(cat.p)
	console.log(cat.f)

	addBtn = document.createElement("INPUT");
	addBtn.value = "Add Resource";
	addBtn.type = "button";
	addBtn.className = "Button";

	var div = document.createElement("DIV");
	div.appendChild(selcat);

	addBtn.onclick = function(){
		var ind = cat.findIndex(x=>x.Name===selcat.value)
		var resval = document.createElement("P");
		var res = "Quantity = "+cat[ind].Quantity +" Calories ="+ cat[ind].cal +" Carbs ="+ 
		cat[ind].c +" Protien ="+ cat[ind].p +" Fats ="+ cat[ind].f
		resval.innerHTML = res;
		div.appendChild(resval);
		console.log(cat[ind].Quantity)
		console.log(cat[ind].cal)
		console.log(cat[ind].c)
		console.log(cat[ind].p)
		console.log(cat[ind].f)
		console.log(ind)
	}

	//Create a Remove Button.
	var btnRemove = document.createElement("INPUT");
	btnRemove.value = "Remove";
	btnRemove.type = "button";
	btnRemove.className = "Button"
	btnRemove.onclick = function () {
		dvContainer.removeChild(this.parentNode);
	};


	//Add the Remove Buttton to DIV.
	div.appendChild(addBtn);
	div.appendChild(btnRemove);
	
	//Add the DIV to the container DIV.
	dvContainer.appendChild(div);
}
