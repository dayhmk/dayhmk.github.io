function doZappdragonsFor(subject){
  jQuery(function($) {
        $("#"+subject+"-feed").rss("http://zappdragons.wordpress.com/feed/", {
          limit: 1,
          layoutTemplate: '<div class="dl-horizontal">{entries}</div>',
          entryTemplate: '<div>{bodyEdit}</div>',
          tokens: {
            bodyEdit: function(entry, tokens){ 
              var string = "";
              string = entry.content.trim();
              
              var strings = string.split(new RegExp(subject, "i"));
              if(strings.length > 1){
                string = strings[1];
              }else{
                string = strings[0];
              }
              strings = string.split(new RegExp("(english|history|math|science)", "i"));
              string = strings[0];
              string = string.trim();
              
              if(string.indexOf(":") != -1){
              	string = string.substr(string.indexOf(":")+1);
              }
              
              /*strings = string.split(":");
              if(strings.length > 1){
              	string = "";
                for(var i = 1; i<strings.length; i++){
                	string = string+strings[i];
                }
              }else{
                string = strings[0];
              }
              
              strings = string.split(new RegExp("</p>", "i"));
              string = "";
              for(var i = 0; i<strings.length; i++){
                string = string+strings[i]+"</p>";
              }*/
              if(string.indexOf('<a rel="nofollow"') != -1){
              	string = string.substr(0,string.indexOf('<a rel="nofollow"'));
              }
              $("#"+subject+"-progress").remove();
              return editText(string.trim());
            }
          }
        }).show();
      })
}

function doMath(){
    $.ajax({
           url:'https://dayhmkproxy.herokuapp.com/http://www2.newton.k12.ma.us/~sarah_nitsche/?OpenItemURL=S04B9F0E6',
           success:function(input){
        var text = input;
        var strings = text.split(new RegExp("(january|february|march|april|may|june|july|august|september|october|november|december)","i"));
        if(strings.length > 2)
            text = strings[2];
        strings = text.split(new RegExp("</u>","i"));
        text = strings[1];
        strings = text.split(new RegExp("<u>","i"));
        text = strings[0];
        
        $("#math-progress").remove();
        $("#math-homework").html(text);
              
        text = document.getElementById("math-homework").textContent;
        document.getElementById("math-homework").innerHTML = editText(text);
        
    },
    error:function(jqXHR,textStatus,errorThrown){
           error(jqXHR,textStatus,errorThrown);
    }});
}

function doSpanish(){
    $.ajax({
           url:'https://dayhmkproxy.herokuapp.com/http://www2.newton.k12.ma.us/~cassandra_spittel/?OpenItemURL=S0B3E6873',
           success:function(input){
              var text = input;
              
              var strings = text.split('<div align="center">');
              if(strings.length > 1)
                text = strings[1];
              //text = text.split("</div>")[0];
              
              var strings = text.split(/<table[^>]*>/);
              if(strings.length > 1)
                text = strings[1];
              
              text = text.split("</table>")[0];
              
              strings = text.split("<tr>");
              var trList = [];
              for(var i = 1; i<strings.length; i++){
                trList[i-1] = strings[i].split("</tr>")[0];
              }
              
              var date = "";
              {
                strings = trList[0].split(/<td[^>]*>/);
                if(strings.length > 1){
                    date = strings[1];
                }else{
                    throw "Error parsing Spanish";
                    return;
                }
                date = date.split("</td>");
                date = getHTMLText(date);
                date = date.toString().match(/\d+/g);
                var d = new Date();
                d.setFullYear("20"+date[2]);
                d.setMonth(date[0]-1);
                d.setDate(date[1]);
                date = d;
              }
              var thisDate = new Date();
              if(!(thisDate.getDay() == 0 || thisDate.getDay() == 6 || thisDate.getDay() == 5)){
                strings = trList[1].split(/<td[^>]*>/);
                var hmk;
                if(strings.length > thisDate.getDay()+2){
                    hmk = strings[thisDate.getDay()+2];
                }else{
                    throw "Error parsing Spanish";
                    return;
                }
                hmk = hmk.split("</td>");
                hmk = getHTMLText(hmk);
                $("#spanish-progress").remove();
                $("#spanish-homework").html(hmk.toString());
              }else{
                strings = trList[1].split(/<td[^>]*>/);
                var hmk;
                if(strings.length > 2){
                    hmk = strings[2];
                }else{
                    //ERROR
                    return;
                }
                hmk = hmk.split("</td>");
                hmk = getHTMLText(hmk);
                $("#spanish-progress").remove();
                $("#spanish-homework").html(hmk.toString());
              }
              
              text = document.getElementById("spanish-homework").textContent;
              document.getElementById("spanish-homework").innerHTML = editText(text);
              
    },
    error:function(jqXHR,textStatus,errorThrown){
           error(jqXHR,textStatus,errorThrown);
    }});
}

function getHTMLText(html){
    var div = document.createElement("div");
    div.innerHTML = html;
    var returnVal = div.textContent;
    div.remove();
    return returnVal;
}