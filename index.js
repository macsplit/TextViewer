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
    let ext = filename.split('.').pop(); 
    let lang = detect(type, ext);
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

function detect(mime, ext) {

  switch (ext) {
    case 'cpp':
      return 'cpp';
    case 'html':
      return 'html';
    case 'java':
      return 'java';
    case 'js':
      return 'javascript';
    case 'json':
      return 'json';
    case 'lua':
      return 'lua';
    case 'md':
      return 'markdown';
    case 'php':
      return 'php';
    case 'py':
      return 'python';
    case 'sh':
      return 'shell';
    case 'sql':
      return 'sql';
    case 'txt':
    default:
  }

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
    case 'text/x-markdown':
      return 'markdown';
    case 'application/x-php':
    case 'text/php':
      return 'php';
    case 'application/x-perl':
    case 'text/x-perl-script':
      return 'perl';
    case 'text/x-python':
    case 'text/x-python-script':
      return 'python';
    case 'application/x-ruby':
    case 'text/x-ruby-script':
      return 'ruby';
    case 'application/x-shellscript':
    case 'application/x-sh':
      return 'shell';
    case 'application/sql':
      return 'sql';
    case 'text/plain':
    default:
      return '';
  }

}