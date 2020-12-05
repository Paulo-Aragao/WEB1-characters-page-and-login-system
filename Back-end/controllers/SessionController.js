import User from '../models/User'

class SessionController{
    async store(req,res){
        const {email} = req.body;
        if(EmailValidation(email)){
            let user = await User.findOne({email});
            if(!user){
                let user = await User.create({email,level:0,cash:0,cards:[{}]});
                return res.json(user);
            }else{
                return res.json(user);
            }
        }else{
            return res.json('invalid email');
        }
        
    }
    async update(req,res){
        const {user_id} = req.params;
        const user = await User.updateOne({_id: user_id},{
            cards:[{name:'a',image:'saasd'},{name:'dasa',image:'sdsasaasd'}],
        });
        return res.json(user);
    }
    
}
function EmailValidation(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export default new SessionController();