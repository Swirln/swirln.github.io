var Module = {
	onRuntimeInitialized: function() {
		console.log("ready");
	}
};

function setButtonsEnabled(value)
{
  document.getElementById('dropbox').disabled = !value;
  document.getElementById('test-btn').disabled = !value;
}

var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (blob, fileName) {
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

function handleArrayBuffer(arrayBuffer) {
  setButtonsEnabled(false);
  var array = new Uint8Array(arrayBuffer);
  var totalBytes = array.length * array.BYTES_PER_ELEMENT;
  var pointer = Module._malloc(totalBytes);
  var dataHeap = new Uint8Array(Module.HEAPU8.buffer, pointer, totalBytes);
  dataHeap.set(array);

  /*
    struct _xmlBuffer {
        unsigned char* content; // 2 or 4 bytes
        unsigned int use; // 1 byte
    }
  */
  var xmlBufferPointer = Module._to_xml(pointer, 5);
  var xmlPointer = Module.getValue(xmlBufferPointer, 'i16*');
  var size = Module.getValue(xmlBufferPointer + 4, 'i32');
  var outputBuffer = new Uint8Array(Module.HEAPU8.buffer, xmlPointer, size);
  var blob = new Blob([outputBuffer], { type: 'text/plain' });
  var fileURL = URL.createObjectURL(blob);
  setButtonsEnabled(true);
  window.location.href = fileURL;
  //window.open(fileURL);
  //saveData(blob, "output.rbxl");
//var outputAsString = new TextDecoder("utf-8").decode(outputBuffer);
}

function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    console.log(file);
    var fileReader = new FileReader();
    fileReader.onload = function() {
    	var arrayBuffer = this.result;
      handleArrayBuffer(arrayBuffer);
    };
    fileReader.readAsArrayBuffer(file);
  }
}

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  var files = e.dataTransfer.files;
  handleFiles(files);
}

var dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

var testButton = document.getElementById('test-btn');
testButton.addEventListener("click", function() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "lib/example.rbxl");
  xhr.responseType = "arraybuffer";
  xhr.onload = function() {
    if (this.status == 200) {
      handleArrayBuffer(xhr.response);
    }
  };
  xhr.send();
});