
const login = ( req, res ) => {
    try{
        const { email, password } = req.body;
        res.json({ email, password })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            msg: 'Error interno, por favor comuniquese con el administrador'
        });
    }
    
};

module.exports = {
    login
}