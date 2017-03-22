//fridge

myFridgeArray=[];
var myFridge = document.getElementById('demo');

function unhide(clickedButton, divID) {

	var item = document.getElementById(divID);

	if (item){

		if(item.className=='hidden'){
			item.className = 'unhidden' ;
		}
		else{
			item.className = 'hidden';
		}
	}
}

function addItems(){
	var food= document.getElementById('food').value;
	var entry= document.createElement('li');
	entry.appendChild(document.createTextNode(food));
	myFridge.appendChild(entry);
	myFridgeArray.push(food);
}

$(document).on('click', 'li', function (e) {
    $(this).remove();
}); 
//end Fridge

 $(document).ready(function(){
	var submitIcon = $('.searchbox-icon');
    var inputBox = $('.searchbox-input');
	var searchBox = $('.searchbox');
	var isOpen = false;
	submitIcon.click(function(){
		if(isOpen == false){
			searchBox.addClass('searchbox-open');
			inputBox.focus();
			isOpen = true;
        }
		else {
			searchBox.removeClass('searchbox-open');
			inputBox.focusout();
			isOpen = false;
        }
	});  
	submitIcon.mouseup(function(){
		return false;
	});
	searchBox.mouseup(function(){
		return false;
	});
	$(document).mouseup(function(){
		if(isOpen == true){
			$('.searchbox-icon').css('display','block');
			submitIcon.click();
		}
    });
 });
//submit button function
function buttonUp(){
	var inputVal = $('.searchbox-input').val();
	console.log ("buttonup--- " + inputVal);
	inputVal = $.trim(inputVal).length;
		if( inputVal !== 0){
			$('.searchbox-icon').css('display','none');

        } 
		else {
			$('.searchbox-input').val('');
			$('.searchbox-icon').css('display','block');
		}
}
//API request & get recipes
function searchRecipe(){
	var inputVal = $('.searchbox-input').val();
	console.log("ready to search for recipe on" + inputVal);
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://food2fork.com/api/search?key=ffcd4c529a484ee8053c372ef3324f98&q=" + inputVal + "", true);
	xhr.onload = function (e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log(xhr.responseText);
				var newResp = JSON.parse(xhr.responseText);
				var recipes = newResp.recipes;
				for (var i = 0; i < 11; i++) {
					console.log("rec"+i);
					document.getElementById("li"+i).innerHTML = recipes[i].title;
					document.getElementById("limg"+i).src = recipes[i].image_url;
					document.getElementById("link"+i).href = recipes[i].source_url;
				} 
			} 
			else {
				console.error(xhr.statusText);
			}
		}
	};

	xhr.onerror = function (e) {
		console.error(xhr.statusText);
	};
	xhr.send(null);
}
//add Recipes to CookBook from Search
function addRecipe(i){
	// Check browser support
	if (typeof(Storage) != "undefined") {
		// Store
		var x = 0;
		for (var j = 0; j < 10; j++) {
			if(localStorage.getItem("item"+j) == null) {
				x=j;
				break;
			}
		}
		//alert("-item-"+x);
		localStorage.setItem("item"+x, document.getElementById("li"+i).innerHTML);
		localStorage.setItem("itemL"+x, document.getElementById("link"+i).href);
		localStorage.setItem("itemJ"+x, document.getElementById("limg"+i).src);
		// Retrieve
		//alert("-item-"+localStorage.getItem("item"+x)+"-itemL-"+localStorage.getItem("itemL"+x)+"-itemJ-"+localStorage.getItem("itemJ"+x)+ " Added" );
	}
	else {
		document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
	}
	window.location.href = "file:///C:/Users/gwc/Documents/Final%20Project/Group2.html#four";
	window.location.reload();
}

//add Recipes to CookBook from Recommended Recipes
function addRecipe1(i){
	// Check browser support
	if (typeof(Storage) != "undefined") {
		// Store
		var x = 0;
		for (var j = 0; j < 10; j++) {
			if(localStorage.getItem("item"+j) == null) {
				x=j;
				break;
			}
		}
		//alert("-item-"+x);
		localStorage.setItem("item"+x, document.getElementById("Li"+i).innerHTML);
		localStorage.setItem("itemL"+x, document.getElementById("Link"+i).href);
		localStorage.setItem("itemJ"+x, document.getElementById("Limg"+i).src);
		// Retrieve
		//alert("-item-"+localStorage.getItem("item"+x)+"-itemL-"+localStorage.getItem("itemL"+x)+"-itemJ-"+localStorage.getItem("itemJ"+x)+ " Added" );
	} 
	else {
		document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
	}
	window.location.href = "file:///C:/Users/gwc/Documents/Final%20Project/Group2.html#four";
	window.location.reload();
}

function getRecipes(){
	//alert("page4--"+localStorage.length/3);
	for (var i = 0; i < 10; i++) {
		if(localStorage.getItem("item"+i) != null) {
			document.getElementById("recipe"+i).innerHTML = localStorage.getItem("item"+i);
			document.getElementById("web"+i).href = localStorage.getItem("itemL"+i);
			document.getElementById("img"+i).src = localStorage.getItem("itemJ"+i);
		}
		else {
			document.getElementById("delete"+i).remove();
		}
	}
}

//delete from CookBook
function del(i){
	//alert("removed!!!"+i);
	document.getElementById("delete"+i).remove();
	localStorage.removeItem("item"+i);
	localStorage.removeItem("itemL"+i);
	localStorage.removeItem("itemJ"+i);
	alert("removed")
		window.location.reload();
}
//shuffle fridge items
function shuffleArray() 
{
	for (var i = myFridgeArray.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = myFridgeArray[i];
		myFridgeArray[i] = myFridgeArray[j];
		myFridgeArray[j] = temp;
	}				
}				
//recipe results from items in fridge			
function searchRecommend(){
	shuffleArray();
	var search1 = myFridgeArray[0];
	var search2 = myFridgeArray[1];
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://food2fork.com/api/search?key=ffcd4c529a484ee8053c372ef3324f98&q=" + search1 + " " + search2 + "", true);
		xhr.onload = function (e) {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					console.log(xhr.responseText);
					var newResp = JSON.parse(xhr.responseText);
					var recipes = newResp.recipes;
					for (var i = 0; i < 11; i++) {
						document.getElementById("Li"+i).innerHTML = recipes[i].title;
						document.getElementById("Limg"+i).src = recipes[i].image_url;
						document.getElementById("Link"+i).href = recipes[i].source_url;
					} 
				} 
				else {
					console.error(xhr.statusText);
				}

			}

		};

	xhr.onerror = function (e) {
		console.error(xhr.statusText);
	};
	xhr.send(null);
}
