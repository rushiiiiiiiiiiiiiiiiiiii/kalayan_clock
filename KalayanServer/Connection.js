const db=require("mysql");
const conn=db.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"Kalayan"
})
conn.connect(function (err){
    if(err){
        console.log("somethingb wrong")
    }
    else{
        console.log("Connection successfull")
    }
});
module.exports=conn


// const conn = mysql.createPool({
//     host:"sg2nlmysql23plsk.secureserver.net",

//     user:"kalayanserver",
//     password:"kalayan@123",
//     database:"kalayan",
//   connectionLimit: 10,  // Number of connections in the pool
//   waitForConnections: true,
//   queueLimit: 0
// });

// // Use the pool to query
// conn.getConnection((err, connection) => {
//   if (err) {
//     console.error('Database connection failed:', err);
//   } else {
//     console.log('Connected to database');
//     connection.release(); // Release connection
//   }
// });

// module.exports = conn;

