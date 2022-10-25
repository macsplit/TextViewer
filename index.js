var loaded = false;
var type = "";
var filename = "";

$("#file-upload").change( (e)=> {
	let file = e.target.files[0];
  type = file.type;
  filename = file.name;
	const reader = new FileReader();
  reader.addEventListener('load', (event) => {
  text = event.target.result;    
    let lang = detect(type);
    html =  (lang) ? (hljs.highlight(text, {language: lang})).value : text;
    $("#inner-code").html(html);
    $("#close,#download,#print").removeClass("disabled");
    document.title = filename;
    loaded = true;
  });
  reader.readAsText(file);
});

$("#close").click( () =>{
  $("#inner-code").text("");
  loaded = false;
  type = "";
  filename ="";
  $("#close,#download,#print").addClass("disabled");
});

$("#print").click( () => {
  if (loaded) {
    window.print();
  }
});

$("#download").click( () =>{
  if (!loaded)
    return;
  text = $("#inner-code").text();
  let el = document.createElement('a');
  el.setAttribute('href', 'data:'+type+';charset=utf-8,' + encodeURIComponent(text));
  el.setAttribute('download', filename);
  el.style.display = 'none';
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
});

function detect(mime) {

  switch (mime) {
    case 'text/x-c++src':
      return 'cpp';
    case 'text/css':
      return 'css';
    case 'text/html':
      return 'html';
    case 'text/x-java':
      return 'java';
    case 'application/javascript':
    case 'application/x-javascript':
      return 'javascript';
    case 'application/json':
      return 'json';
    case 'text/x-lua':
      return 'lua';
    case 'text/markdown':
      return 'markdown';
    case 'application/x-php':
      return 'php';
    case 'application/x-perl':
      return 'perl';
    case 'text/x-python':
      return 'python';
    case 'application/x-ruby':
      return 'ruby';
    case 'application/x-shellscript':
      return 'shell';
    case 'application/sql':
      return 'sql';
    case 'text/plain':
    default:
      return '';
  }

}