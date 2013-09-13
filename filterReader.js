//callback. It must be customized.
//calbackの作り方
//datalistとdefaultListの型は同じにする。
//your codeで囲まれた部分にコードを記述する。
//編集したデータは必ずdatalistに入れる。
var callBackAfterReadLine = function(line,datalist){
  var defaultList = {};  //required. defaultList and datalist must be a same data format.
  var methods  = {};
  if (arguments.length != 0){
    /* your code start */
    var aryText = line.split(',');
    datalist[aryText[0]] = line;  // required
    /* your code  end  */
    var getData = function(){ return datalist;}
  }else{
    var getData = function(){ return defaultList;}
  }
  //methods
  methods.getData = getData;
  return methods;
}

/*****************************************/
// call back for filter config
/*****************************************/
var callback_AfterReadLine = function(line,datalist){
  /*your container start */
  var defaultList = [];  //required. defaultList and datalist must be a same data format.
  /*your container end*/
  var methods  = {};
  if (arguments.length != 0 || line != undefined){
    /* your code start */
    datalist.push( line );  // required
    /* your code  end  */
    var getData = function(){ return datalist;}
  }else{
    var getData = function(){ return defaultList;}
  }
  //methods
  methods.getData = getData;
  return methods;
}
//**********************
//main
//**********************
var pathFilterFile = "C:/shared/pathfilter.txt";
var processFilterFile = "C:/shared/pathfilter.txt";
var urlFilterFile = "C:/shared/pathfilter.txt";
var ftpFilterFile = "C:/shared/pathfilter.txt";

var pathFilter = fileReader( pathFilterFile );
var pathList = pathFilter.read(callback_AfterReadLine);

var procFilter = fileReader( processFilterFile );
var procList = procFilter.read(callback_AfterReadLine);

var urlFilter = fileReader( urlFilterFile );
var urlList = urlFilter.read(callback_AfterReadLine);

var ftpFilter = fileReader( ftpFilterFile );
var ftpList = ftpFilter.read(callback_AfterReadLine);

WScript.echo('records->' + pathList.length);
for (var i = 0 ; i < pathList.length ; i++){
  WScript.echo('filter is -> ' +  pathList[i]);	
}
