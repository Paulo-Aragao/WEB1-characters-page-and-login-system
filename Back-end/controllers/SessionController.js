import User from '../models/User'

class SessionController{
    async store(req,res){
        const {email} = req.body;
        if(EmailValidation(email)){
            let user = await User.findOne({email});
            if(!user){
                let user = await User.create({email});
                return res.json(user);
            }else{
                return res.json('email find in the db');
            }
        }else{
            return res.json('invalid email');
        }
        
    }
}
function EmailValidation(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export default new SessionController();