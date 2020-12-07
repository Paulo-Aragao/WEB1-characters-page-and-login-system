import User from '../models/User'

class SessionController{
    async store(req, res){
        const { email } = req.body;
        if(EmailValidation(email)){
            let user = await User.findOne({ email });
            if(!user){
                let user = await User.create({ email, level: 0, cash: 0, chars: [{}] });
                return res.json(user);
            } else {
                return res.json(user);
            }
        } else {
            return res.status(400).send('Invalid email');
        }
    }
    async update(req, res){
        const { _id } = req.params;
        const { email, level, cash, chars } = req.body;

        const user = await User.findOneAndUpdate(
          { _id },
          { email, level, cash, chars },
          { new: true }
        );

        return res.json(user);
    }
    
}
function EmailValidation(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export default new SessionController();