var url = "https://dayhmkproxy.herokuapp.com/";

function editText(text){
    var out = text.replace(new RegExp("quizlet","gi"),'<a href="https://quizlet.com/">Quizlet</a>');
    out = out.replace(new RegExp("schoology","gi"),'<a href="http://schoology.newton.k12.ma.us/login/ldap?&school=105120621">Schoology</a>');
    out = out.replace(new RegExp("middlebury interactive","gi"),'<a href="https://app.middleburyinteractive.com/">Middlebury Interactive</a>');
    out = out.replace(new RegExp("(google docs|google doc|google drive)","gi"),'<a href="https://drive.google.com/a/newton.k12.ma.us">Google Doc</a>');
    return out;
}

function setup(team){setup(team,{});}

function setup(team, links){
	$('#body').load("base.html", function(){
		setupCheckboxEvents();
		$('#title').html(team+" Homework");
		
		readHomework(team, "english");
		readHomework(team, "history");
		readHomework(team, "math");
		readHomework(team, "science");
		readHomework(team, "spanish");
		setLink("english", links);
		setLink("history", links);
		setLink("math", links);
		setLink("science", links);
		setLink("spanish", links);
	});
}

function setLink(name, links){
	try{
	    $('#'+name+'-link').text(links[name+"-text"]);
	    $('#'+name+'-link').attr("href", links[name+"-link"]);
	}catch(ex){}
}

function readHomework(team, subject){
	$('#'+subject+'-homework').load(url+team.toLowerCase()+"/"+subject+".php", 
		function(response, status, xhr){
			$('#'+subject+'-progress').remove();
			if(status == "error"){
				if(xhr.status == 404){
					$('#'+subject+'-homework').html(
					'<p class="text-warning">Coming Soon!</p>');
				}else{
					$('#'+subject+'-homework').html(
					'<p class="text-danger">Uh-oh! Something went wrong!</p>');
				}
			}
		});
}

function setupCheckboxEvents(){
	$(document).ready(function(){
    	$("input").change(function(){
			if($(this).prop("checked")){
				$(this).parent().parent().children(".panel-body").hide();
			}else{
				$(this).parent().parent().children(".panel-body").show();
			}
    	});
	});
}
