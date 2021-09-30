require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const passport = require('passport')
app.use(passport.initialize()); 
//import files
const todoRouter = require('./routes/todo');
const userRouter = require('./routes/userRoutes');
const ratingRoute = require('./routes/rating');
//const checkAuth = require('./middleware/checkAuth')
//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set("view enjine", "ejs");
// initialization of passport

//databse connection
require('./database/mongo')
//routing 
app.get('/', (req, res) => {
    res.render('home.ejs')
});
app.get('/register', (req, res) => {
    res.render('registration.ejs')
})

app.get('/index',  (req, res) => {
    res.render('protect.ejs')
})
app.get('/login', (req, res) => {
    res.render('login.ejs')
})
app.use('/todo', todoRouter);
app.use('/user', userRouter);
app.use('/rating', ratingRoute);
//listning
app.listen(port, () => {
    console.log(`server is running on port${port}`)
})