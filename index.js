var loaded = false;
var type = "";
var filename = "";

function escapeCode(text){
  textnode = document.createTextNode(text);
  let el = document.createElement('p');
  el.appendChild(textnode);
  return el.innerHTML;
}

$("#file-upload").change( (e)=> {
	let file = e.target.files[0];
  type = file.type;
  filename = file.name;
	const reader = new FileReader();
  reader.addEventListener('load', (event) => {
  text = event.target.result;
    let ext = filename.split('.').pop(); 
    let lang = detect(type, ext);
    html =  (lang) ? (hljs.highlight(text, {language: lang})).value : escapeCode(text);
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
    case 'hpp':
      return 'cpp';
    case 'cs':
      return 'csharp';
    case 'css':
      return 'css';
    case 'diff':
      return 'diff';
    case 'go':
      return 'go';
    case 'graphql':
      return 'graphql';
    case 'ini':
      return 'ini';
    case 'html':
      return 'html';
    case 'java':
      return 'java';
    case 'js':
      return 'javascript';
    case 'json':
      return 'json';
    case 'kt':
      return 'kotlin';
    case 'less':
      return 'less';
    case 'lua':
      return 'lua';
    case 'm':
      return 'objectivec';
    case 'md':
      return 'markdown';
    case 'php':
      return 'php';
    case 'pl':
      return 'perl';
    case 'py':
      return 'python';
    case 'r':
      return 'r';
    case 'rb':
      return 'ruby';
    case 'rs':
      return 'rust';
    case 'scss':
      return 'scss';
    case 'sh':
      return 'bash';
    case 'sql':
      return 'sql';
    case 'ts':
      return 'typescript';
    case 'xml':
      return 'xml';
    case 'yaml':
    case 'yml':
      return 'yaml';
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
    case 'text/xml':
      return 'xml';
    case 'text/plain':
    default:
      return '';
  }

}