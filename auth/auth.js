const User = require('../model/user'); // Importation du modèle User
const bcrypt = require('bcrypt'); // Importation de bcrypt
const jwt = require('jsonwebtoken'); // Importation de jsonwebtoken
const jwtsecret = 'jBQBHSDHJBVHKBQFHUDWSHVGCDCBCHJBWHJCBSHG'; // Clé secrète pour la génération du token

//CRUD

exports.register = async (req, res, next) => { // Création d'un nouvel utilisateur
    const {username, password} = req.body; // Récupération des données du formulaire
    if(password.length < 6) { // Vérification de la longueur du mot de passe
        return res.status(400).json({ // Si le mot de passe est inférieur à 6 caractères, on renvoie une erreur
            message: 'Le mot de passe doit contenir au moins 6 caractères.'
        }); // On renvoie une erreur
    }
    bcrypt.hash(password, 10).then(async (hash) => { // On hash le mot de passe
        await User.create({ // On crée l'utilisateur
            username, 
            password:hash // On stocke le hash du mot de passe
        })
        .then((User) => { // Si l'utilisateur est créé avec succès
            const maxAge = 3*60*60; // Durée de vie du token
            const token = jwt.signing({id: User._id, username, role: User.role}, jwtsecret, {expiresIn: maxAge}); // Création du token
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000}); // On stocke le token dans un cookie
            res.status(201).json({ // On renvoie un message de succès
                message: 'Utilisateur créé avec succès.', // Message de succès
                user: User._id, role: User.role, // On renvoie l'id de l'utilisateur et son rôle
            });
        })
        .catch((error) => { // Si l'utilisateur n'a pas pu être créé
            res.status(400).json({ // On renvoie une erreur
                message: 'L\'utilisateur existe déjà.', // Message d'erreur
                error: error.message, // Message d'erreur
            })
        });
    });
};
exports.login = async (req, res, next) => { // Connexion d'un utilisateur
    const {username, password} = req.body; // Récupération des données du formulaire
    if(!username || !password) { // Vérification des données du formulaire
        res.status(400).json({ // Si le formulaire est incomplet, on renvoie une erreur
            message: 'Veuillez remplir tous les champs.'
        });
    }
    try { // On essaie de trouver l'utilisateur dans la base de données
        const user = await User.findOne({username}); // Requete SQL pour rechercher l'utilisateur dans la base de données
        if(!user){ // Si l'utilisateur n'existe pas
            res.status(400).json({ // On renvoie une erreur
                message: 'L\'utilisateur n\'a pas été trouvé.', // Message d'erreur
                error: error.message, // Message d'erreur
            });
        }
    } catch(err){ // Si l'utilisateur n'a pas pu être trouvé
        res.status(400).json({ // Si l'utilisateur n'a pas pu être trouvé
            message: 'Une erreur est survenue.', // Message d'erreur
            error: err.message, // Message d'erreur
        });
    }
};
exports.update = async (req, res, next) => {};
exports.delete = async (req, res, next) => {};
exports.getUser = async (req, res, next) => {};