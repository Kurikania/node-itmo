function loadContent() {
	let content = document.getElementById('content')
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'ajax.html', true);
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) return;
		if (xhr.status != 200) {
			alert( xhr.status + ': ' + xhr.statusText ); 
		} else {
			content.innerHTML = xhr.responseText
		}
	}
}