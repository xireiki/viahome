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
      } else {
        alert("文件大小 > " + 1024 * 1024 * 2 + "，将不保存，刷新失效");
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
function setting(){
  //获取或者设置设置信息
  var info = {
    "bookmark": true,
    "bookmarks": { },
    "addBookmark": true,
    "deleteBookmark": false,
    "bg": true,
    "bgOptimize": true,
    "live2d": true,
    "Lenovo": true,
    "attribute": false,
    "title": true
  };
  if(localStorage.getItem("settingInfo")){
    Info = localStorage.getItem("settingInfo");
    info = $.parseJSON(Info);
  } else {
    Info = JSON.stringify(info);
    localStorage.setItem("settingInfo", Info);
  }
  //执行设置
  if(localStorage.getItem("backgroundImage") && info["bg"]){
    $("html").css("background-image", "url(" + localStorage.getItem("backgroundImage") + ")");
  } else if(info["bg"] && !localStorage.getItem("backgroundImage")){
    $("html").addClass("bg");
  }
  if(info["bgOptimize"]) $("html").css("background-position", "center 0");
  if(info["live2d"]) live2d();
  if(!info["attribute"]) $("body").append('<p class="copyright copytext"><a href="https://xireiki.github.io/viahome" style="color: #ffffff">&copy;禾煦</a> | @2021</p>');
  if(!info["title"]) $(".Title").remove();
  if(info["bookmark"]){
    $("#content").append('<div id="bookmark_part"><div id="box_container"></div></div>');
    for (bm in info["bookmarks"]){
      $("#box_container").append('<div class="box"><p class="title" style="background:' + info["bookmarks"][bm]["color"] + '">' + info["bookmarks"][bm]["title"] + '</p><div class="overlay" style="background: url(' + info["bookmarks"][bm]["url"] + ') no-repeat;background-size: cover;background-position:center center;"></div><p class="url">' + bm + '</p><a href="' + info["bookmarks"][bm]["url"] + '" title="' + bm + '"></a></div>');
    }
    if (info["addBookmark"]) $("#box_container").append('<div class="box" onclick="inputBookmark()"><p class="title" style="background:#66ccff80;">添加</p><div class="overlay" style="background: url() no-repeat;background-size: cover;background-position:center center;"></div><p class="url">添加书签</p></div>');
    if (info["deleteBookmark"]) $("#box_container").append('<div class="box" onclick="removeBookmark()"><p class="title" style="background:#66ccff80;">删除</p><div class="overlay" style="background: url() no-repeat;background-size: cover;background-position:center center;"></div><p class="url">删除书签</p></div>');
  }
  //在设置中显示设置
  for (name in info){
    $("input[name=\"" + name + "\"]").prop("checked", info[name]);
  }
  //监听设置选项变化
  $("input[type=\"checkbox\"]").click(function(){
    info[this.name] = $(this).prop("checked");
    Info = JSON.stringify(info);
    localStorage.setItem("settingInfo", Info);
  });
}
function 禾煦(){
  if(item("backgroundImage")){
    downDataUrl(item("backgroundImage"), "bg.jpg");
  } else {
    downUrl("./img/phone.jpg", "bg.jpg");
  }
}
function outresult(a){
  $("#console .output p").append(a + "\n");
}
function exec_shell(){
  if($("#console .input .inputText").val()){
    outresult(shell($("#console .input .inputText").val()));
  }
}
function print(str){
  return str;
}
function live2d(id){
  if (id === undefined){
    $("body").append('<div id="live2d"></div>');
    id = "live2d";
  }
}
function clearSetting(){
  if(confirm("确认清楚所有设置信息？")) item().clear(),location.reload();
}
function inputBookmark(){
  $("body").append(`
    <div id="input">
      <div>
        <div>
          <p style="height: 45px; text-align: center;">添加书签</p>
          <input type="text" name="TITLE" placeholder="标题（浏览器限制，自行输入）" required="required" /><br />
          <input type="text" name="url" placeholder="书签地址" required="required" /><br />
          <input type="text" name="icon" placeholder="网站图标（浏览器限制，自行输入）" required="required" /><br />
          <input type="text" name="color" placeholder="背景颜色（默认：#66ccff80）" required="required" /><br />
          <input type="text" name="fontcolor" placeholder="字体颜色（默认：#ffffff）" required="required" /><br />
          <div>
            <button id="ibm" style="margin: 5px 9px 5px; width: 60px; height: 30px;">确定</button>
            <button id="close" style="margin: 5px 9px 5px; width: 60px; height: 30px;">关闭</button>
          </div>
        </div>
      </div>
    </div>
  `);
  $("#ibm").click(function(){
    title = ($('input[name="TITLE"]').val() === "") ? undefined : $('input[name="TITLE"]').val();
    url = ($('input[name="url"]').val() === "") ? undefined : $('input[name="url"]').val();
    icon = ($('input[name="icon"]').val() === "") ? undefined : $('input[name="icon"]').val();
    color = ($('input[name="color"]').val() === "") ? undefined : $('input[name="color"]').val();
    fontcolor = ($('input[name="fontcolor"]').val() === "") ? undefined : $('input[name="fontcolor"]').val();
    addBookmark({title: title, url: url, icon: icon, color: color, fontcolor: fontcolor});
  });
  $("#close").click(function(){
    $("#input").remove();
  });
}
function addBookmark({title, url, icon, color, fontcolor}, func){
  info = JSON.parse(item("settingInfo"));
  icon = (icon === undefined) ? "" : icon;
  color = (color === undefined) ? "#66ccff80" : color;
  fontcolor = (fontcolor === undefined) ? "#ffffff" : fontcolor;
  info["bookmarks"][title] = {
    "title": title.substr(0, 2),
    "icon": icon,
    "url": url,
    "color": color,
    "font-size": fontcolor
  }
  if(typeof func == "function"){
    func(info);
  }
  item("settingInfo", JSON.stringify(info));
  location.reload();
}
function removeBookmark(){
  info = JSON.parse(item("settingInfo"));
  site = "";
  sites = [];
  num = 0;
  for (bm in info["bookmarks"]){
    site = site + "    " + num.toString() + ". " + bm + "\n";
    sites[num] = bm;
    num = num + 1;
  }
  if (confirm("您有如下书签: \n" + site + "请在稍后的输入框中输入对应序号，多个序号以英文逗号分隔，点击确定开始输入")){
    result = prompt("请输入对应序号").split(".");
  }
  for (i in result){
    delete info["bookmarks"][sites[parseInt(i)]];
  }
  item("settingInfo", JSON.stringify(info));
  location.reload();
}
(function(){
  $("#tool li a").click(function(){
    $("#content").css("display", "none");
  });
  welcome();
})();
shell = eval;
