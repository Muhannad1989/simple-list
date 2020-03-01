// **************server*************************
const express = require('express');
const app = express();
app.use(express.json({ extended: false }));

// ****************mongoDB******************************
const mongoose = require('mongoose');
const Student = require('./models/Student');

async function connectDb() {
  // Use new database connection
  await mongoose.connect('put here your secret key', {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('DB Connected');
}

connectDb();

// *************************mySql******************************************

// const mysql = require('mysql');

// mysql
// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '1111',
//   database: 'students',
// });

// localhost:5000/register_student
app.post('/register_student', async (req, res) => {
  try {
    const newPost = await new Student({
      first: req.body.first,
      last: req.body.last,
    });

    await newPost.save();
    res.status(200).send('good');
  } catch (error) {
    console.error(error);
  }
});

// localhost:5000/list  get
// localhost:5000/register_student post  first:    last:

// any static data
// const students = [
//   {
//     name: 'razan',
//     age: 25,
//   },
//   {
//     name: 'hiba',
//     age: 26,
//   },
// ];

// my routs / end points
app.get('/list', async (req, res) => {
  try {
    // bring data from database "mongoDB"
    let data = await Student.find();
    // return data to user
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(5000, () => console.log('your app listening on port 5000!'));
