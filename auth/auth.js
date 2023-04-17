const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtsecret = 'jBQBHSDHJBVHKBQFHUDWSHVGCDCBCHJBWHJCBSHG';
//CRUD

exports.register = async (req, res, next) => {
    const {username, password} = req.body;
    if(password.length < 6) {
        return res.status(400).json({
            message: 'Le mot de passe doit contenir au moins 6 caractères.'
        });
    }
    bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
            username,
            password:hash
        })
        .then((User) => {
            const maxAge = 3*60*60;
            const token = jwt.signing({id: User._id, username, role: User.role}, jwtsecret, {expiresIn: maxAge});
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000});
            res.status(201).json({
                message: 'Utilisateur créé avec succès.',
                user: User._id, role: User.role,
            });
        })
        .catch((error) => {
            res.status(400).json({
                message: 'L\'utilisateur existe déjà.',
                error: error.message,
            })
        });
    });
};
exports.login = async (req, res, next) => {};
exports.update = async (req, res, next) => {};
exports.delete = async (req, res, next) => {};
exports.getUser = async (req, res, next) => {};