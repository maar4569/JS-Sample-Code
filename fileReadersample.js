//callback. It must be customized.
//calbackの作り方
//datalistとdefaultListの型は同じにする。
//your codeで囲まれた部分にコードを記述する。
//編集したデータは必ずdatalistに入れる。
var callBackAfterReadLine = function(line,datalist){
var defaultList = [];  //required. defaultList and datalist must be a same data format.
var methods  = {};
if (arguments.length != 0){
  /* your code start */
  var aryText = line.split(',');
  datalist.push(line);  // required. in sample code is arrayList.
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
var pgTableSizeFile = "C:/shared/sample.txt";

var pgTbl = fileReader( pgTableSizeFile ,'shift_jis' ); //case shift_jis. 
var sizeList = pgTbl.read(callBackAfterReadLine);

WScript.echo('records->' + sizeList.length);
for (var i = 0 ; i < sizeList.length ; i++){
  WScript.echo('filter is -> ' +  sizeList[i]);	
}
