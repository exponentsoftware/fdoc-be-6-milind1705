const Rating = require('../models/ratings');
const Todo = require('../models/todo');

module.exports.createRating =async (req, res) =>{
    const newRating = new Rating(req.body);
    const todo = await Todo.findOne({_id: req.params.todoid})
    newRating
        .save()
        .then((data) => {
            return res.status(200).json(data)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
        //association with todo
        todo.rating.push(newRating._id)
        await todo.save();
        console.log(todo)
}

