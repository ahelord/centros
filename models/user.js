
function validUser(data)
{
    //validamos la longitud del nombre
    if(data.nombre != null)
    {
        return false;
    }
    else{
        return true;
    }
}
exports.saveUser = function(db,newUser,res){
    if(validUser(newUser))
    {
        db.user.save(newUser,function(err,req){
            if(!err){
                res.send("Hola");
                return true;
            }
            else{
                return false;
            }
        });

    }
    else
    {
        return false;
    }
}