require('dotenv').config();
const express = require('express');
const app= express();
const {connectDB} = require('./dbConfig/db')
const cors = require('cors')
//middleware
app.use(express.json())

// connectdb
connectDB();

app.use(cors())

// routes
app.use('/api/v1',require('./router/user.router'))
app.use('/api/v1',require('./router/books.router'))



const PORT= process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log(`Server listening on the port ${PORT}`);
})