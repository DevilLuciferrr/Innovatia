import bcrypt from 'bcryptjs';

const users = [
    {
        name:"User",
        email:"admin@example.com",
        password: bcrypt.hashSync("123456",10),
        isAdmin:true
    },
    {
        name:"User1",
        email:"user1@innovatia.com",
        password: bcrypt.hashSync("efgh",10)
    }
      
  ];
  
  export default users;