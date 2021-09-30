const Todo = require("../models/todo");
const User = require("../models/user");

module.exports.createTodo = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  const newTodo = new Todo(req.body);
  newTodo
    .save()
    .then((data) => {
      return res.status(200).json({
        error: null,
        data: data,
        message: "successfully fetch the data",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err.message,
        data: null,
        message: "Something went wrong",
      });
    });

  user.todo.push(newTodo.id);
  await user
    .save()
    .then((data) => {
      return console.log(data);
    })
    .catch((err) => {
      return res.status(400).json({
        error: err.message,
        data: null,
        message: "Something went wrong",
      });
    });
};

module.exports.getAllTodo = (req, res) => {
  Todo.find({})
    .then((data) => {
      const page = parseInt(req.query.page) || 1;
      const limits = parseInt(req.query.limits) || 4;

      const startIndex = (page - 1) * limits;
      const endIndex = page * limits;
      let results = {};
      if (endIndex < data.length) {
        results.next = {
          page: page + 1,
          limit: limits,
        };
      }
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limits,
        };
      }

      results.result = data.slice(startIndex, endIndex);
      return res.status(200).json(results);
    })
    .catch((err) => {
      return res.status(400).json({
        message: err.message || "Something went wrong",
      });
    });
};

module.exports.getTodoById = (req, res) => {
  Todo.findById({ _id: req.params.id })
    .then((data) => {
      const page = parseInt(req.query.page);
      const limits = parseInt(req.query.limits);

      const startIndex = (page - 1) * limits;
      const endIndex = page * limits;
      let results = {};
      if (endIndex < data.length) {
        results.next = {
          page: page + 1,
          limit: limits,
        };
      }
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limits,
        };
      }

      results.result = data.slice(startIndex, endIndex);
      return res.status(200).json(results);
    })
    .catch((err) => {
      return res.status(400).json({
        message: err.message || "Something went wrong",
      });
    });
};

module.exports.updateTodo = (req, res) => {
  Todo.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Todo.findById({ _id: req.params.id })
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).json({
          message: err.message || "Something went wrong",
        });
      });
  });
};

module.exports.deletTodoById = (req, res) => {
  Todo.findByIdAndDelete({ _id: req.params.id })
    .then((data) => {
      return res.status(200).json("Successfully deleted");
    })
    .catch((err) => {
      return res.status(400).json({
        message: err.message || "Something went wrong",
      });
    });
};

module.exports.getAllTodoByTitle = (req, res) => {
  const title = req.query.title;
  const category = req.query.category;
  Todo.find({ title: title, category: category })
    .then((data) => {
      const page = parseInt(req.query.page);
      const limits = parseInt(req.query.limits);

      const startIndex = (page - 1) * limits;
      const endIndex = page * limits;
      let results = {};
      if (endIndex < data.length) {
        results.next = {
          page: page + 1,
          limit: limits,
        };
      }
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limits,
        };
      }

      results.result = data.slice(startIndex, endIndex);
      return res.status(200).json(results);
    })
    .catch((err) => {
      return res.status(400).json({
        message: err.message || "Something went wrong",
      });
    });
};

module.exports.getAllTodoByCategory = (req, res) => {
  const category = req.query.category;
  Todo.find({ category: category })
    .then((data) => {
      if ((data.category = category)) {
        return res.status(200).json(data);
      } else {
        return res.status(204).json({
          message: "No data with this category",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        message: err.message || "Something went wrong",
      });
    });
};

module.exports.getAllTodoSort = (req, res) => {
  Todo.find({})
    .sort("created_at")
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(400).json({
        message: err.message || "Something went wrong",
      });
    });
};

module.exports.doneTodo = (req, res) => {
  Todo.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Todo.findById({ _id: req.params.id })
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).json({
          message: err.message || "Something went wrong",
        });
      });
  });
};


//get completed todo
module.exports.getCompletedTodo = (req, res) => {

  Todo.find({completedStatus: "completed"}).populate("rating")
    .then((data) => {
      const page = parseInt(req.query.page) || 1;
      const limits = parseInt(req.query.limits) || 4;

      const startIndex = (page - 1) * limits;
      const endIndex = page * limits;
      let results = {};
      if (endIndex < data.length) {
        results.next = {
          page: page + 1,
          limit: limits,
        };0
      }0
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limits,
        };
      }

      results. result = data.slice(startIndex, endIndex);
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(400).json({
        message: err.message || "Something went wrong",
      });
    });
}