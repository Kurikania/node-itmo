
let cardsLoaded = 0;

function loadContent() {
    let items = []
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'products.json', true);
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) return;
		if (xhr.status != 200) {
			alert( xhr.status + ': ' + xhr.statusText ); 
		} else {
            let loaded =  xhr.responseText
            loaded = JSON.parse(loaded)
            for (let i = cardsLoaded; i < cardsLoaded + 4; i++) {
                items.push(loaded[i])
            }
            cardsLoaded = cardsLoaded + 4
            addCard(items) 
		}
    } 
}

loadContent()

function addCard(arr) {
    for (let i = 0; i < arr.length; i++) {
        
        let title = document.createElement("h3");
        title.innerText = arr[i].title;
        
        let price = document.createElement("p");
        price.innerText = arr[i].price + "руб.";

        let img =  document.createElement("img");
        img.setAttribute("src", "img/" + arr[i].filename)

        let div = document.createElement('div');
        div.classList.add("card");
        div.appendChild(title);
        div.appendChild(img);
        div.appendChild(price);

        let shopping = document.getElementById("content");
        shopping.appendChild(div);
        if(cardsLoaded >= 7) {
            showMore.style.display = "none"
        }
    }
}





