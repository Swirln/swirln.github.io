window.onload = function() {
	var crypt = new JSEncrypt();
	var key = document.getElementById('key');
	var signature = document.getElementById('signature');
	var input = document.getElementById('input');
	
	key.value = crypt.getPrivateKey();
	
	input.addEventListener('change', function(e) {
		var file = input.files[0];
		var reader = new FileReader();

		reader.onload = function(e) {
			crypt.setPrivateKey(key.value);
			document.getElementById('signature').value = '--rbxsig%' + crypt.sign(reader.result, CryptoJS.SHA1, "sha1") + '%';
		}

		reader.readAsText(file);    
	});
};

function generate() {
	var crypt = new JSEncrypt();
	document.getElementById('key').value = crypt.getPrivateKey();
}

// https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function copy(id) {
	var signature = document.getElementById(id);
	signature.focus();
	signature.select();
	try {
		var success = document.execCommand('copy');
		console.log('copying text was ' + success ? 'successful' : 'unsuccessful');
	} catch(e) {
		console.log('couldn\'t copy text');
	}
}