function editText(text){
    var out = text.replace(new RegExp("quizlet","gi"),'<a href="https://quizlet.com/">Quizlet</a>');
    out = out.replace(new RegExp("schoology","gi"),'<a href="http://schoology.newton.k12.ma.us/login/ldap?&school=105120621">Schoology</a>');
    out = out.replace(new RegExp("middlebury interactive","gi"),'<a href="http://schoology.newton.k12.ma.us/login/ldap?&school=105120621">Middlebury Interactive</a>');
    out = out.replace(new RegExp("(google docs|google doc|google drive)","gi"),'<a href="https://drive.google.com/a/newton.k12.ma.us">Google Doc</a>');
    return out;
}