const validateRole = (...roles) => {
    return (req, res, next) => {
        try {
            if(roles.includes(req.user.role)){
                return next();
            }
            return res.status(403).json({
                msg: 'Usuario no tiene los permisos necesarios'
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Ocurrió un error interno, por favor contacte con el Administrador'
            });
        }
    }
}
module.exports = { validateRole };