'use strict';

// consructor
var N3 = function() {
  this.env = {};
  this.env.ON  = false;  // on 3ds browser
  this.env.NEW = false;    // dont use uppercase for old
  this.env.OLD = false;
  //this.env.ON = true;
  //this.env.NEW = true;

  this.env.console = false;
  this.con = null;

  this.$topScreen = null;
  this.$bottomScreen = null;

  //this.env.ctr = false;
  //this.env.spr = false; // LL
  //this.env.ktr = false; // new
  //this.env.red = false; // new LL
  //this.env.ftr = false; // 2DS

  var agent       = navigator.userAgent;

  if(agent.search("Nintendo 3DS") != -1){
    this.env.ON = true;
    if(agent.search("New Nintendo 3DS") != -1){ 
      this.env.NEW = true;
    }
    else{
      this.env.OLD = true;
    }
  }
}

N3.prototype.console = function(){};

N3.prototype.init = function(scr) {
 this.$scr = scr === undefined ? $('#screen') : $(scr);

  if(!this.$scr)
    return; 

  $(document.body).css('overflow','hidden');
  
  // for cursol scroll
  this.$scr.css('width','400');
  this.$scr.css('position','relative');
  this.$scr.css('overflow','hidden');

  // Screen
  this.$topScreen
    = $('<div style="width:400px;height:224px;overflow:hidden;margin:0 auto;background-color:red;position: relative;">');
  this.$bottomScreen
    = $('<div style="width:320px;height:240px;overflow:hidden;margin:0 auto;background-color:blue;position: relative;">');

  if(this.OLD){
    this.$bottomScreen.css('height','224px');
  }

  this.$scr.append(this.$topScreen);
  this.$scr.append(this.$bottomScreen);  

  // for console
  if($("#console")){
    this.env.console = true;
    this.$con = $('<textarea name="console" rows="25" cols="42" style="margin:12px 0px 0px 40px"></textarea>');
    $("#console").hide();
    $("#console").append(this.$con);

    // コンソール表示切替ボタン
    var $con_btn = 
      $('<span style="height:20px;width:20px;position:absolute;top:227px;right:44px;background-color:#ccc;border-radius:20px;-moz-border-radius:20px;-webkit-border-radius:20px;vertical-align: middle;border:3px solid #555"> </span>');
    $con_btn.bind('click',{_this : this }, function(event){
        event.data._this.$scr.toggle();
        $("#console").toggle();
    }) ;
    $(document.body).append($con_btn);
    
    this.console = function(text){
      this.$con.append(text + '\n');
    };
  }

  // 画面固定用
  if(this.env.ON)
  {
    window.setInterval(function () {
      window.scrollTo(40, 224); 
    }, 50);
  }
};


