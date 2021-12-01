const User = require('../models/User');


exports.getUsers = async (req,res) => {
    const users = await User.find({}).select('firstname lastname'); //.select (select only the firstname and lastname fields)
    return res.status(200).json(users);
}

exports.addUser = async (req, res) => {
    try {
        const userToAdd = new User({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username
        })
        //alternative way of creating a user.
        const resultUser = await userToAdd.save();

        return res.status(200).json({message:'User was created', createdUser:resultUser})
    } catch (error) {
        return res.status(400).json({message:'Error happened', error:error})
    }
}

exports.addOneFavoriteById = async (req, res) => {
         
    const { favorite } = req.body;
    const { id } = req.params;

    try {
        
        const updatedUser = await User.findByIdAndUpdate(id, { $push:{favorites:favorite}}, {new:true})

        if(!updatedUser) return res.status(404).json({message: 'User not found'});

        return res.status(200).json({message:'User was updated', updatedUser:updatedUser});


    } catch (error) {
        return res.status(400).json({message:'Error happened', error})
    }
}

exports.addMultipleFavoritesById = async (req, res) => {
         
    const { favorites } = req.body;
    const { id } = req.params;

    const favoritesArray = favorites.split(',');

    try {
        
        const updatedUser = await User.findByIdAndUpdate(id, { $push:{favorites:{$each:favoritesArray}}}, {new:true})

        if(!updatedUser) return res.status(404).json({message: 'User not found'});

        return res.status(200).json({message:'User was updated', updatedUser:updatedUser});


    } catch (error) {
        return res.status(400).json({message:'Error happened', error})
    }
}

exports.addOneUniqueFavoriteById = async (req, res) => {
         
    const { favorite } = req.body;
    const { id } = req.params;

    try {
        //adds the value to the array if the value does not already exist in the array. 
        const updatedUser = await User.findByIdAndUpdate(id, { $addToSet:{favorites:favorite}}, {new:true})

        if(!updatedUser) return res.status(404).json({message: 'User not found'});

        return res.status(200).json({message:'User was updated', updatedUser:updatedUser});


    } catch (error) {
        return res.status(400).json({message:'Error happened', error})
    }
}

exports.removeOneFavoriteById = async (req, res) => {
         
    const { id } = req.params;

    try {
        //remove a value from the array. 
        //-1 deletes the first element. 
        //1 deletes the last element. 
        const updatedUser = await User.findByIdAndUpdate(id, { $pop:{favorites:1}}, {new:true})

        if(!updatedUser) return res.status(404).json({message: 'User not found'});

        return res.status(200).json({message:'User was updated', updatedUser:updatedUser});


    } catch (error) {
        return res.status(400).json({message:'Error happened', error})
    }
}

exports.updateById = async (req, res) => {

    const { username } = req.body;
    const { id } = req.params;

    try {
        //remove a value from the array. 
        const updatedUser = await User.findByIdAndUpdate(id, { $set:{username:username}}, {new:true})

        if(!updatedUser) return res.status(404).json({message: 'User not found'});

        return res.status(200).json({message:'User was updated', updatedUser:updatedUser});


    } catch (error) {
        return res.status(400).json({message:'Error happened', error})
    }
}

exports.removeFieldById = async (req, res) => {

    const { id } = req.params;

    try {
        //remove a key/value from the array. 
        const updatedUser = await User.findByIdAndUpdate(id, { $unset:{username:""}}, {new:true})

        if(!updatedUser) return res.status(404).json({message: 'User not found'});

        return res.status(200).json({message:'User was updated', updatedUser:updatedUser});


    } catch (error) {
        return res.status(400).json({message:'Error happened', error})
    }
}