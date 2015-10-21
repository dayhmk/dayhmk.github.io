function doHistory(){
  jQuery(function($) {
        $("#history-feed").rss("http://fireteamhistory.blogspot.com/feeds/posts/default", {
          limit: 1,
          layoutTemplate: '<div class="dl-horizontal">{entries}</div>',
          entryTemplate: '<div>{bodyEdit}</div>',
          tokens: {
            bodyEdit: function(entry, tokens){
              $("#history-progress").remove();
              return editText(entry.content.trim());
            }
          }
        }).show();
      })
}

function doMillosLearningCenterFor(subject,times){
    $.ajax({
           dataType: "json",
           url:'http://anyorigin.com/dev/get?url=' + encodeURIComponent('http://www2.newton.k12.ma.us/~millos/?OpenItemURL=S080F3395') + '&callback=?',
           success:function(input){
        var text = input.contents;
        var strings = text.split(new RegExp("(january|february|march|april|may|june|july|august|september|october|november|december)","i"));
        if(strings.length > 2)
              text = strings[2];
        text = text.split(new RegExp(subject,"i"))[1];
        strings = text.split(new RegExp("</div>","i"));
        text = "";
        for(var i = 0; i<strings.length-1; i++){
            text = text+strings[i];
        }
        text = text.split(new RegExp("(math|science|history|english)","i"))[0];
        text = text.trim();
        while(text.charAt(0) === ':')
            text = text.substr(1);
        
        $("#"+subject+"-feed").html(text.trim());
        $("#"+subject+"-progress").remove();
              
        text = document.getElementById(subject+"-feed").textContent;
        text = text.replace(/\s\s+/g, '<br>');
        text = text.replace(".<br>",".");
        if(subject.toUpperCase() === "MATH"){
            text = text.replace(new RegExp("7M:","i"),"<br><strong>7M:</strong> ");
            text = text.replace(new RegExp("7A:","i"),"<br><strong>7A:</strong> ");
        }
        while(text.indexOf("<br>") == 0){
            text = text.substr(4);
        }
        document.getElementById(subject+"-feed").innerHTML = editText(text.trim());
        
    },error:function(jqXHR,textStatus,errorThrown){
        if(textStatus != null && textStatus == "timeout" && times < 3){
           doMillosLearningCenterFor(subject,times+1);
           return;
        }
        error(jqXHR,textStatus,errorThrown);
    }});
}

function doSpanish(times){
    $.ajax({
           dataType: "json",
          url:'http://anyorigin.com/dev/get?url=' + encodeURIComponent('http://www2.newton.k12.ma.us/~courtney_fournier/?OpenItemURL=S08BD3AB2') + '&callback=?',
           success:function(input){
              var text = input.contents;
              var strings = text.split(new RegExp("(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)","i"));
              if(strings.length > 1)
                text = strings[strings.length-1];
              text = text.split(new RegExp('<a href="http://www2.newton.k12.ma.us/~courtney_fournier/S08BD3AB2.0/1713_123951_0.png"',"i"))[0];
              
              strings = text.split(new RegExp("<div>","i"));
              for(var i = 0; i<strings.length-1; i++){
                text = strings[i]+"<div>";
              }
              
              $("#spanish-homework").html(text.trim());
              $("#spanish-progress").remove();
              
              text = document.getElementById("spanish-homework").textContent;
              document.getElementById("spanish-homework").innerHTML = editText(text.trim());
              
        },error:function(jqXHR,textStatus,errorThrown){
            if(textStatus != null && textStatus == "timeout" && times < 3){
                doSpanish(times+1);
                return;
            }
            error(jqXHR,textStatus,errorThrown);
        }});
}