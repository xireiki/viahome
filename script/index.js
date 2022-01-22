function welcome(){
  console.log(`%cWelcome to %c禾煦\n\
%c _\n\
| |\n\
| |__   _____  ___   _\n\
| \'_ \\ / _ \\ \\/ / | | |\n\
| | | |  __/>  <| |_| |\n\
|_| |_|\\___/_/\\_\\\\__,_|\n\
  `, `
    font-size: 20px;
  `, `
    color: rgb(241, 141, 0, 255);
    font-size: 20px;
  `, `
    font-size: 16px;
    color: rgb(241, 141, 0, 255);
  `);
}
function submitBackground(){
  files = $("input[name='background']").prop("files");
  if(files.length != 0){
    reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = function(){
      $("html").css("background-image", "url(" + this.result + ")");
      imagelen = this.result.length;
      if(imagelen < 1024 * 1024 * 2){
        localStorage.setItem("backgroundImage", this.result);
      }
    }
  } else {
    alert("请选择文件.");
  }
}
function clearBackground(){
  if(localStorage.getItem("backgroundImage") != null){
    localStorage.removeItem("backgroundImage");
    $("html").css("background-image", "");
  } else {
    alert("无需清除.");
  }
}
(function(){
  welcome();
  if(localStorage.getItem("backgroundImage")){
    $("html").css("background-image", "url(" + localStorage.getItem("backgroundImage") + ")");
  }
})();
