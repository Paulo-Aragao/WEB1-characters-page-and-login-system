function Login(form){
    form.user.value = form.user.value.toLowerCase()
    if(EmailValidation(form.user.value)){
        //alert("email valido")
    }else{
        alert("email invalido")
    }
}
function EmailValidation(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}