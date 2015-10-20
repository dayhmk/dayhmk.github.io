function editText(text){
    var out = text.replace(new RegExp("quizlet","gi"),'<a href="https://quizlet.com/">Quizlet</a>');
    out = out.replace(new RegExp("schoology","gi"),'<a href="http://schoology.newton.k12.ma.us/login/ldap?&school=105120621">Schoology</a>');
    out = out.replace(new RegExp("middlebury interactive","gi"),'<a href="http://schoology.newton.k12.ma.us/login/ldap?&school=105120621">Middlebury Interactive</a>');
    out = out.replace(new RegExp("(google docs|google doc|google drive)","gi"),'<a href="https://drive.google.com/a/newton.k12.ma.us">Google Doc</a>');
    return out;
}
function error(jqXHR,textStatus,errorThrown){
    var emailBody = "This is a application-generated email. DO NOT EDIT!!! Just send.\n";
    if(textStatus != null)
        emailBody += "Text Status:"+textStatus+"\n\n";
    if(errorThrown != null)
        emailBody += "HTTP Error:"+errorThrown;
    var error = '<br><div class="alert alert-dismissible alert-danger">';
    error += '<button type="button" class="close" data-dismiss="alert">×</button>';
    error += '<strong>Uh-oh</strong> An error occured. ';
    error += '<a href="mailto:dayhomework@gmail.com?subject=ERROR_REPORT&body='+encodeURIComponent(emailBody)+'">Send a Report</a></div>'
    $("#msg").append(error);
}