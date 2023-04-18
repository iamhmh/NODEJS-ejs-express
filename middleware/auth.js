const jwt = require("jsonwebtoken"); // npm i jsonwebtoken
const jwtsecret = 'jBQBHSDHJBVHKBQFHUDWSHVGCDCBCHJBWHJCBSHG'; // constante de sécurité

exports.adminAuth = (req, res, next) => { // middleware d'authentification pour les admins
  const token = req.cookies.jwt; // Récupération du token dans les cookies
  if (token) { // Si le token est présent
    jwt.verify(token, jwtsecret, (err, decodedToken) => { // On vérifie le token
      if (err) { // Si le token n'est pas valide
        res.status(401).json({ message: "Not authorized" }); // On renvoie une erreur
      } else { // Si le token est valide
        if (decodedToken.role !== "admin") { // Si l'utilisateur n'est pas admin
          res.status(401).json({ message: "Not authorized" }); // On renvoie une erreur
        } else {
          next(); // Si l'utilisateur est admin, on passe à la suite
        }
      }
    });
  } else {
    res.status(401).json({ message: "Not authorized, token not available" }); // Si le token n'est pas présent, on renvoie une erreur
  }
};
exports.userAuth = (req, res, next) => { // middleware d'authentification pour les utilisateurs
  const token = req.cookies.jwt; // Récupération du token dans les cookies
  if (token) { // Si le token est présent
    jwt.verify(token, jwtsecret, (err, decodedToken) => { // On vérifie le token
      if (err) { // Si le token n'est pas valide
        res.status(401).json({ message: "Not authorized" }); // On renvoie une erreur
      } else { // Si le token est valide
        if (decodedToken.role !== "user") { // Si l'utilisateur n'est pas un utilisateur
          res.status(401).json({ message: "Not authorized" }); // On renvoie une erreur
        } else {
          next(); // Si l'utilisateur est un utilisateur, on passe à la suite
        }
      }
    });
  } else {
    res.status(401).json({ message: "Not authorized, token not available" }); // Si le token n'est pas présent, on renvoie une erreur
  }
};