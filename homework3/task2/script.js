let users
function loadContent() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'users.json', true);
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) return;
		if (xhr.status != 200) {
			alert( xhr.status + ': ' + xhr.statusText ); 
		} else {
            users =  xhr.responseText
            users = JSON.parse(users)
            addUser(users) 
		}
    }
    
}

function addUser(arr) {
    let list = document.getElementById("content");
    let ul = document.createElement('ul');
    list.appendChild(ul);
    for (let i = 0; i < arr.length; i++) {
        let name = document.createElement("li");
        name.innerText = arr[i].name;
        ul.appendChild(name);
    }
}


