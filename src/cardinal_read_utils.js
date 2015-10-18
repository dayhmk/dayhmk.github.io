var dateKeywords = ["january", "febuary", "march","april","may","june","july","august","september","october"];

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
              
              strings = string.split(":");
              if(strings.length > 1){
                string = strings[1];
              }else{
                string = strings[0];
              }
              
              strings = string.split(new RegExp("</p>", "i"));
              for(var i = 0; i<strings.length-1; i++){
                string = strings[i]+"</p>";
              }
              return string.trim();
            }
          }
        }).show();
        $("#"+subject+"-progress").remove();
      })
}

function doMath(){
    $.getJSON('http://anyorigin.com/dev/get?url=' + encodeURIComponent('http://www2.newton.k12.ma.us/~sarah_nitsche/?OpenItemURL=S04B9F0E6') + '&callback=?', function(input){
        var text = input.contents;
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
        document.getElementById("math-homework").innerHTML = text;
        
    });
}

function doSpanish(){
    $.getJSON('http://anyorigin.com/dev/get?url=' + encodeURIComponent('http://www2.newton.k12.ma.us/~cassandra_spittel/?OpenItemURL=S0B3E6873') + '&callback=?', function(input){
              var text = input.contents;
              
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
                    //ERROR
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
              var dateList = [date,thisDate];
              dateList.sort();
              if(dateList[0] == thisDate && !(date.getDay() == 0 || date.getDay() == 1)){
                strings = trList[1].split(/<td[^>]*>/);
                var hmk;
                if(strings.length > date.getDay()+1){
                    hmk = strings[date.getDay()+1];
                }else{
                    //ERROR
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
              
              text = document.getElementById("math-homework").textContent;
              document.getElementById("math-homework").innerHTML = text;
              
    });
}

function getHTMLText(html){
    var div = document.createElement("div");
    div.innerHTML = html;
    var returnVal = div.textContent;
    div.remove();
    return returnVal;
}