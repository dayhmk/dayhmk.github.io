var url = "https://dayhmkproxy.herokuapp.com/";

// Force HTTPS
if (window.location.protocol != "https:" && window.location.protocol != "file:"){
    window.location.href = "https:"+window.location.href.substring(window.location.protocol.length);
}

function editText(text){
    var out = text.replace(new RegExp("quizlet","gi"),'<a href="https://quizlet.com/">Quizlet</a>');
    out = out.replace(new RegExp("schoology","gi"),'<a href="http://schoology.newton.k12.ma.us/login/ldap?&school=105120621">Schoology</a>');
    out = out.replace(new RegExp("middlebury interactive","gi"),'<a href="https://app.middleburyinteractive.com/">Middlebury Interactive</a>');
    out = out.replace(new RegExp("(google docs|google doc|google drive)","gi"),'<a href="https://drive.google.com/a/newton.k12.ma.us">Google Doc</a>');
    return out;
}

function setup(team, b){setup(team);}

function setup(team){
	$('#body').load("base.html", function(){
		setupCheckboxEvents();
		$('#title').html(team+" Homework");
		
		readHomework(team, "english");
		readHomework(team, "history");
		readHomework(team, "math");
		readHomework(team, "science");
		readHomework(team, "spanish");
		readHomework(team, "french");
		readHomework(team, "italian");
		readHomework(team, "chinese");
	});
}

function setLink(name, links){
	try{
	    $('#'+name+'-link').text(links[name+"-text"]);
	    $('#'+name+'-link').attr("href", links[name+"-link"]);
	}catch(ex){}
}

function readHomework(team, subject){
	$.ajax({
		url:url+team.toLowerCase()+"/"+subject+".php",
		success: function(text){
			var data = $.parseJSON(text);
			$('#'+subject+'-homework').html(data.hw);

			var parent = $('#'+subject+'-progress').parent();
			$('#'+subject+'-progress').remove();
			parent.append('<input style="margin-left: auto;" type="checkbox">');
			parent.children(".checkbox").show("fast");
			parent.children().change(function(){
				if($(this).prop("checked")){
					$(this).parent().parent().children(".panel-body").hide();
				}else{
					$(this).parent().parent().children(".panel-body").show();
				}
    			});
	
			try{
	    			$('#'+subject+'-link').text(data.name);
	    			$('#'+subject+'-link').attr("href", data.url);
			}catch(ex){}
			$('#'+subject+'-homework').show("fast", function() {
    				$('#'+subject+'-link').parent().show("fast");
 			 });
		},
  		statusCode: {
   			404: function() {
				var parent = $('#'+subject+'-progress').parent();
				$('#'+subject+'-progress').remove();
				parent.append('<span style="margin-left: auto;" class="label label-caution">Coming Soon!</span>');
				parent.children(".label-caution").show("fast");
    			}
		},error: function(error) {
			$('#'+subject+'-progress').hide("fast", function() {
				var parent = $('#'+subject+'-progress').parent();
				$('#'+subject+'-progress').remove();
				parent.append('<span style="margin-left: auto;" class="label label-danger">Uh-Oh! Error!</span>');
				parent.children(".label-danger").show("fast");
			});
	}});
}

function setupCheckboxEvents(){
	$(document).ready(function(){
    	$("input").change(function(){
			if($(this).prop("checked")){
				$(this).parent().parent().children(".panel-body").hide("fast");
			}else{
				$(this).parent().parent().children(".panel-body").show("fast");
			}
    		});
	});
}
