const { ApolloServer, gql, MockList } = require("apollo-server");
// const { string, email } = require("casual");
const faker = require("faker")
const port = 3000

const typeDefs = gql`
  type Query {
    user: User
    findTaskSPV: [Tasks]
  }

  type Tasks{
    id:Int,
    project_id:Int
    assignee:Int
    title:String
    description:String
    start_date: String
    due_date:String
    attachment: String
    status:String
    notes:[Note]
  }

  type Note{
    id:Int
    task_id:Int
    note:String
  }

  type User {
    id:Int
    fullname:String
    username:String
    email:String
    password:String
    role:String
    spv_id:Int
  }

  type Mutation {
    Login(email:String,password:String): User
    createUser(fullname:String,username:String,email:String,password:String,role:String,spv_id:Int): User
    updateUser(id:Int,fullname:String,username:String,email:String,role:String,spv_id:Int): User
    deleteUser(id:Int): Int

    updatePassword(id:Int,password:String): User
    createNote(id:Int,note:String): Note
  }
`;

const mocks = {
  Int:()=> faker.random.number({min:1,max:10}),
  String:()=> faker.name.findName(),
  // Email:()=> faker.internet.email(),
  // Password:()=> faker.internet.password()
  User:()=>({
    email:()=> faker.internet.email(),
    password:()=> faker.internet.password(),
    role:()=> faker.random.arrayElement(["supervisor","planner","worker"]),
    spv_id:()=> faker.random.number({min:5,max:15})
  }),
  Tasks:()=>({
    id:()=>faker.random.number({min:1,max:10}),
    project_id:()=>faker.random.number({min:1,max:10}),
    assignee:()=>faker.random.number({min:1,max:10}),
    title:()=> faker.lorem.text(),
    description:()=>faker.lorem.sentence(),
    start_date:()=> faker.date.recent(),
    due_date:()=> faker.date.soon(),
    attachment:()=> faker.internet.url(),
    status:()=> faker.random.arrayElement(["Draft","Submit","Approved","Return","Reject","Todo","Doing","Done"])
  }),
  Note:()=>({
    id:()=>faker.random.number({min:1,max:10}),
    task_id:()=>faker.random.number({min:1,max:10}),
    note:()=>faker.lorem.text()
  })

};

const server = new ApolloServer({
  typeDefs,
  mocks,
});

server.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
