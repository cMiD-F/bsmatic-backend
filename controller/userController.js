const User = require("../models/userModel");

const createUser = async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email:email});
    if(!findUser) {
        // Criar um novo usuário
        const newUSer = await User.create(req.body);
        res.json(newUSer);
    } else {
        res.json({
            msg: "O usuário já existe",
            success: false,
        });
    }
};

module.exports = { createUser };