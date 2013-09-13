/***************************************************/
/* rutInfo      */
/***************************************************/
function rutInfo(){
  this.uid;
  this.seq;
  this.pcname;
}
/***************************************************/
/* rutList */
/***************************************************/
var rutList = function(){
  var rutXmlList      = {}; //key:uid value:rutxml
  var methods        = {};

  //methods
  var addList = function(uid,rutInfo){ 
    rutXmlList[uid] = rutInfo;
  }
  methods.addList = addList;
  var getPcNamesByUid = function(targetUid){
    var pcList = [];
    var i=0;
    for (var uid in rutXmlList){
         if (uid == targetUid ) {
           pcList[i] = rutXmlList[uid].pcname;
            i++; 
         }else{
           WScript.echo('not exists PcNamebyUid -> ' + seq )
         }
    }
    return pcList;
  }
  methods.getPcNamesByUid = getPcNamesByUid;
  var existsSeq = function(seq){
      for (var uid in rutXmlList){
        if (rutXmlList[uid].seq == seq){
          return rutXmlList[uid]
        }else{
          WScript.echo('not exists seq->' + seq)
        }
      }
        return false;
  }
  methods.existsSeq = existsSeq;
  var dump = function(){
    WScript.echo('dump');
    var i = 0;
    for (var uid in rutXmlList){
    	i++;
      WScript.echo('[dump_key,uid,seq,pcname]->' + uid + ','+ rutXmlList[uid].uid + ',' + rutXmlList[uid].seq + ',' + rutXmlList[uid].pcname);
    }
  }
  methods.dump = dump;
  
  var makeList = function(xmlObject){
    var tmpUid = tmpSeq = tmpPcName =  '';
    var nodeRoot = xmlObject.documentElement;
    var nodeList = nodeRoot.getElementsByTagName('RUT');
    for( var i = 0 ; i < nodeList.length ; i++){
      var node = nodeList[i];
      var objRut   = new rutInfo();
      for(var j = 0 ; j < node.childNodes.length ; j++){
        childNode = node.childNodes[j];
        switch ( childNode.nodeName ){
          case 'uid':
            objRut.uid = childNode.text;
            break;
          case 'seq':
            objRut.seq = childNode.text;
            break;
          case 'pcName':
            objRut.pcname = childNode.text;
            break;
        }
      }
      addList(objRut.uid,objRut);
    }
  }
  methods.makeList = makeList;
  return methods;
}

/***************************************************/
//filtersXml
/***************************************************/
var filtersXml = function(xmlObject){
  var xmlDoc  = xmlObject;
  var filterList = {}; //key:path val:path
  var methods = {};
  var childNodeName = '';
  var decendantName = '';
  
  var setChildName = function( name ){ childNodeName = name; }
  methods.setChildName = setChildName;
  var setDecendantName = function( name ){ decendantName = name; }
  methods.setDecendantName = setDecendantName;
  var addFilters = function(pathList , procFilterPath){
    var xmlRoot = xmlDoc.documentElement; 
    var nextSeq = getNextSeq(xmlRoot);
    try{
      for(var i = 0 ; i < pathList.length ; i++){
        var childNode            = xmlDoc.createElement( childNodeName );
        var seq                      = xmlDoc.createElement("seq");
        seq.appendChild( xmlDoc.createTextNode(nextSeq) );
        var decendantNode = xmlDoc.createElement( decendantName );
        decendantNode.appendChild( xmlDoc.createTextNode(pathList[i]) );
        childNode.appendChild(seq);
        childNode.appendChild(decendantNode);
        childNode.appendChild( xmlDoc.createElement("desc") );
        xmlRoot.appendChild(childNode);
        addCRLF(xmlRoot);
        nextSeq++;
      }
      xmlDoc.save(procFilterPath);
    }catch(e){
      WScript.echo('exception pathfilters.addFilters ' + e.name + '  ' + (e.number & 0xFFFF) + '  ' + e.message);
      return false;
    }
    return true;
  }
  methods.addFilters = addFilters;
  var addCRLF = function(node){
      var lf = xmlDoc.createTextNode('\n');
      node.appendChild(lf);
  }
  var getNextSeq = function(xmlRoot){
      var nextSeq = 0;
      var nodeList = xmlRoot.getElementsByTagName( childNodeName );
      for( var i = 0 ; i < nodeList.length ; i++){
        var node = nodeList[i];
        for(var j = 0 ; j < node.childNodes.length ; j++){
          childNode = node.childNodes[j];
          switch ( childNode.nodeName ){
            case 'seq':
              ( nextSeq <= childNode.text ) ? nextSeq = childNode.text : nextSeq  = nextSeq  ;
          }
        }
      }
      nextSeq++;
      return nextSeq;
  }
  return methods;
}
/***************************************************/
//main
/***************************************************/
/******************************************/
//add default list into [process filter] configuration.
/******************************************/
//read xml
var procFilterPath = "C:/shared/sample/procfilter.xml";
var objXML = xmlFileReader( procFilterPath ).load().getXML();

//set filters
var proclist = new Array ('aaa.exe','bbb.exe','ccc.exe');
var proc_Filter  = filtersXml(objXML);
proc_Filter.setChildName( 'Proc_Filter' );
proc_Filter.setDecendantName( 'log_filter_process' );
proc_Filter.addFilters( proclist ,procFilterPath);


/******************************************/
//get users info from rut.xml.
/******************************************/
var path = "C:/shared/sample/test.xml";
var objXML = xmlFileReader( path ).load().getXML();
var rut_List  = rutList();
rut_List.makeList(objXML);

//dump
rut_List.dump();

//output
