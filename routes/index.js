var express = require('express');
var router = express.Router();
const mongodb='mongodb+srv://phuongntph49273:Pp03082005@demo.rbc0i.mongodb.net/?retryWrites=true&w=majority&appName=demo';
const mongoose=require('mongoose')
mongoose.connect(mongodb,{useNewUrlParser:true, useUnifiedTopology: true}). then(()=> {
  console.log('MongoDB Connected');
}).catch(err => {
  console.log(err);
})

const studentsSCHEMA=new mongoose.Schema({
  name:String,
  address:String,
  phone:String,
})
const STUDENT=mongoose.model('Student',studentsSCHEMA)
router.get('/getDatabase',function (req,res){
  STUDENT.find({}).then(result=>{
    res.send(result);

  })
})

router.get('/createUse',function(req,res){
  const student=new STUDENT({
    name:"Thu Phuong",
    address:"Ha Noi",
    phone:"0987654321"
  })
  student.save().then( result=>{res.send(result);})

})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/getAllUser', function(req, res, next) {
  //res: đối tượng chứa các tham số mà phía elient gửi lên: trình duyệt: android, postman;
  //ré: đối tượng kiểm soát cách dữ liệu được trả về
  //trả về 1 file html, trả về 1 biến, trả về 1 array hay trả về 1 json data
  var jsonData=[{
    id:1,
    name: "Nguyen Van A",
    age: 20
  },
    {
      id:2,
      name: "Nguyen Van B",
      age: 20
    },{
      id:3,
      name: "Nguyen Van C",
      age: 20
    }

  ]
  res.send(jsonData);

});
router.get('/getAUser', function(req, res, next) {
  //res: đôi tượng chứa các tham số mà phía elient gửi lên: trình duyệt: android, postman;
  //ré: đối tượng kiểm soát cách dữ liệu được trả về
  //trả vèe 1 file html, trả về 1 biến, trả về 1 array hay trả về 1 json data
  var jsonData={
    id:1,
    name: "Nguyen Van A",
    age: 20
  }
  res.send(jsonData);

});

router.get('/displayUsers', function(req, res, next) {
  // var jsonData=[{
  //   id:1,
  //   name: "Nguyen Van A",
  //   age: 20
  // },
  //   {
  //     id:2,
  //     name: "Nguyen Van B",
  //     age: 20
  //   },{
  //     id:3,
  //     name: "Nguyen Van C",
  //     age: 20
  //   }
  //
  // ]
  STUDENT.find({}).then( jsonData=>{
    res.render('users' , {name: "Thu Phương",
      data: jsonData})
  })

})
router.get(`/deleteUser`, function(req,res){
  const id = req.params.id;
  STUDENT.deleteOne({id:id}).then( result=>{
    res.redirect(`displayUsers`)
  })
})
router.get(`/updateUser`, function(req,res) {
  const id = req.params.id;
  STUDENT.findOne({id: id}).then(result => {
    res.render(`updateForm`, {data: result});
  })
})
router.post(`/updateUser`, function(req,res){
  const id = req.body.id;
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  STUDENT.updateOne({_id:id},{name:name,address:address, phone:phone}).then(result=>{
  res.redirect(`displayUsers`)
  })

})
router.post('/createrUser', function(req, res, next) {
  const name = req.body.name;
  const age = req.body.age;
  const random=Math.floor(Math.random()*10);
  const student=new STUDENT({
    name:name,
    address:random + "Ha Noi",
    phone:age
  })
  student.save().then(result=>{
    res.redirect(`/displayUsers`);
  })


})
module.exports = router;
