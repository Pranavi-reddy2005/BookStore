const express = require('express')
const app = express()
const Port = 1000
const conn = require('./conn/conn')
app.use(express.json())
const User=require("./routes/UserRoute")
const Books=require('./routes/BookRoute')
const Favourite=require('./routes/FavouriteRouter');
app.use('/favourites',Favourite)
app.use('/books',Books)
app.use('/users', User)
app.listen(Port, (() => console.log('listening in:' + Port)))