/************************************/
/* file reader */
/************************************/
var fileReader = function(name){
  var fileName = name;
  var methods  = {};
  var fso      = new ActiveXObject('Scripting.FileSystemObject');
  //read
  var read = function( callBackFunc ){
    var textStream = fso.OpenTextFile(fileName);
    try{
      var cbFuncs = callBackFunc();
      var dataList = cbFuncs.getData();
      while(textStream.AtEndOfLine == false){
        if ( typeof(callBackFunc) == 'function' ){
          cbFuncs = callBackFunc(textStream.ReadLine(),dataList);
          var dataList2 = cbFuncs.getData();
        }else{
          return -1
        }
      }
      return dataList2;
    }catch(e){
      WScript.echo('exception fileReader.read ' + e);
      return e;
    }
  }
  methods.read = read;
  return methods;
}
//**********************
// PcReport
//**********************
function PcTable(){
  this.smlver = '';
  this.hostname = '';
  this.connectServerSeq = '';
  this.OsType = '';
  this.lastcomm = '';
  this.lastaccount = '';
  this.lastdomain = '';
  this.installdate = '';
  this.installversion = '';
}
//callback. It must be customized.
//calbackの作り方
//datalistとdefaultListの型は同じにする。
//your codeで囲まれた部分にコードを記述する。
//編集したデータは必ずdatalistに入れる。
var callBackAfterReadLine_pcTable = function(line,datalist){
  //key:host value:PcReport
  var defaultList = {};  //required. defaultList and datalist must be a same data format.
  var methods  = {};
  var record = line.replace(/"/g,'');
  if (arguments.length != 0){
    var aryText = record.split(',');
    /* your code start */
    var pcTable = new PcTable();
    pcTable = (function(aryList){
        var tmp = new PcTable();
        tmp.smlver                  = aryList[ 13 ];
        tmp.hostname             = aryList[ 0 ];
        tmp.connectServerSeq = aryList[ 1 ];
        tmp.OsType                 = aryList[ 5 ];
        tmp.lastcomm              = aryList[ 9 ];
        tmp.lastaccount           = aryList[ 10 ];
        tmp.lastdomain            = aryList[ 11 ];
        tmp.installdate             = aryList[ 12 ];
        tmp.installversion         = aryList[ 13 ];
        retun tmp;
    })( aryText );
    datalist[pcReport.hostname] = pcTable;  // required
    /* your code  end  */
    var getData = function(){ return datalist;}
  }else{
    var getData = function(){ return defaultList;}
  }
  //methods
  methods.getData = getData;
  return methods;
}

function PcReport(){
  this.hostname = '';
  this.logdate = '';
  this.department = '';
  this.id = '';
  this.name = '';
  this.logonuser = '';
  this.boottime = '';
  this.shutdowntime = '';
  this.operationtime = '';
}
//callback. It must be customized.
//calbackの作り方
//datalistとdefaultListの型は同じにする。
//your codeで囲まれた部分にコードを記述する。
//編集したデータは必ずdatalistに入れる。
var callBackAfterReadLine_pcReport = function(line,datalist){
  //key:host value:PcReport
  var defaultList = {};  //required. defaultList and datalist must be a same data format.
  var methods  = {};
  var record = line.replace(/"/g,'');
  if (arguments.length != 0){
    /* your code start */
    var pcReport = new PcReport();
    var aryText = record.split(',');
    pcReport = (function(aryList){
        var tmp = new PcReport();
        tmp.hostname         = aryList[ 13 ];
        tmp.logdate             = aryList[ 0 ];
        tmp.department      = aryList[ 1 ];
        tmp.id                     = aryList[ 5 ];
        tmp.name               = aryList[ 9 ];
        tmp.logonuser         = aryList[ 10 ];
        tmp.boottime          = aryList[ 11 ];
        tmp.shutdowntime   = aryList[ 12 ];
        tmp.operetaiontime = aryList[ 13 ];
        retun tmp;
    })( aryText );
    datalist[pcReport.hostname] = pcReport;  // required
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
var pcTableFile = "C:/shared/pctable.csv";
var pcTableCsv = fileReader( pcTableFile );
var pcTableHashList = pcTableCsv.read(callback_AfterReadLine_pcTable);

var pcReportFile = "C:/shared/pcreport.csv";
var pcReportCsv = fileReader( pcReportFile );
var pcReportHashList = pcReportCsv.read(callback_AfterReadLine_pcReport);

