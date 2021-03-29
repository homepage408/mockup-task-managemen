const { ApolloServer, gql, MockList } = require("apollo-server");
// const { string, email } = require("casual");
const faker = require("faker");
const port = 4000;

const typeDefs = gql`
  type Query {
    user: [User]

    findUser(id: Int): User

    findUserSpv(id: Int): User

    findTaskSPV: [Tasks]

    findAllTaskWorker: [Tasks]

    findAllTask: [Tasks]
    findTaskReturn: [Tasks]
    findTaskReject: [Tasks]
  }

  type Tasks {
    id: Int
    project_id: Int
    assignee: Int
    title: String
    description: String
    start_date: String
    due_date: String
    attachment: String
    status: String
    is_read: String
  }

  type TasksAttachment {
    attachment: String
  }

  type Note {
    id: Int
    task_id: Int
    note: String
  }

  type User {
    id: Int
    fullname: String
    username: String
    email: String
    password: String
    role: String
    spv_id: Int
  }

  type LoginAdmin {
    id: Int
    fullname: String
    username: String
    email: String
    password: String
    role: String
    spv_id: Int
  }

  type LoginSupervisor {
    id: Int
    fullname: String
    username: String
    email: String
    password: String
    role: String
    spv_id: Int
  }

  type LoginPlanner {
    id: Int
    fullname: String
    username: String
    email: String
    password: String
    role: String
    spv_id: Int
  }

  type LoginWorker {
    id: Int
    fullname: String
    username: String
    email: String
    password: String
    role: String
    spv_id: Int
  }

  type UpdateStatusIsRead {
    id: Int
    project_id: Int
    assignee: Int
    title: String
    description: String
    start_date: String
    due_date: String
    attachment: String
    status: String
    is_read: String
  }
  type UpdateStatusDraft {
    id: Int
    project_id: Int
    assignee: Int
    title: String
    description: String
    start_date: String
    due_date: String
    attachment: String
    status: String
    is_read: String
  }
  type UpdateStatusIsAproved {
    id: Int
    project_id: Int
    assignee: Int
    title: String
    description: String
    start_date: String
    due_date: String
    attachment: String
    status: String
    is_read: String
  }
  type UpdateStatusIsReturn {
    id: Int
    project_id: Int
    assignee: Int
    title: String
    description: String
    start_date: String
    due_date: String
    attachment: String
    status: String
    is_read: String
  }
  type UpdateStatusIsReject {
    id: Int
    project_id: Int
    assignee: Int
    title: String
    description: String
    start_date: String
    due_date: String
    attachment: String
    status: String
    is_read: String
  }
  type UpdateStatusIsTodo {
    id: Int
    project_id: Int
    assignee: Int
    title: String
    description: String
    start_date: String
    due_date: String
    attachment: String
    status: String
    is_read: String
  }
  type UpdateStatusIsDoing {
    id: Int
    project_id: Int
    assignee: Int
    title: String
    description: String
    start_date: String
    due_date: String
    attachment: String
    status: String
    is_read: String
  }
  type UpdateStatusIsDone {
    id: Int
    project_id: Int
    assignee: Int
    title: String
    description: String
    start_date: String
    due_date: String
    attachment: String
    status: String
    is_read: String
  }

  type Mutation {
    Login(email: String, password: String): User
    LoginAdmin(email: String, password: String): LoginAdmin
    LoginSupervisor(email: String, password: String): LoginSupervisor
    LoginPlanner(email: String, password: String): LoginPlanner
    LoginWorker(email: String, password: String): LoginWorker

    createUser(
      fullname: String
      username: String
      email: String
      password: String
      role: String
      spv_id: Int
    ): User

    updateUser(
      id: Int
      fullname: String
      username: String
      email: String
      role: String
      spv_id: Int
    ): User
    deleteUser(id: Int): Int
    updatePassword(id: Int, password: String): User
    updateTaskWorker(id: Int, status: String): Tasks

    createNote(id: Int, note: String): Note

    createTask(
      project_id: Int
      assignee: Int
      title: String
      description: String
      start_date: String
      due_date: String
      attachment: String
      status: String
      is_read: String
    ): Tasks

    updateTask(
      id: Int
      project_id: Int
      assignee: Int
      title: String
      description: String
      start_date: String
      due_date: String
      attachment: String
      status: String
    ): Tasks

    updateApproval(id: Int, status: String): Tasks
    updateIsRead(id: Int): Tasks

    deleteTask(id: Int): Tasks

    statusToDraft(id: Int, status: String): Tasks

    uploadAttachment(id: Int, attachment: String): TasksAttachment
  }
`;

const mocks = {
  Int: () => faker.random.number({ min: 1, max: 10 }),
  String: () => faker.name.findName(),
  // Email:()=> faker.internet.email(),
  // Password:()=> faker.internet.password()
  User: () => ({
    email: () => faker.internet.email(),
    password: () => faker.internet.password(),
    role: () =>
      faker.random.arrayElement(["admin", "supervisor", "planner", "worker"]),
    spv_id: () => faker.random.number({ min: 5, max: 15 }),
  }),

  LoginAdmin: () => ({
    email: () => faker.internet.email(),
    password: () => faker.internet.password(),
    role: () => faker.random.arrayElement(["admin"]),
    spv_id: () => faker.random.number({ min: 5, max: 15 }),
  }),

  LoginSupervisor: () => ({
    email: () => faker.internet.email(),
    password: () => faker.internet.password(),
    role: () => faker.random.arrayElement(["supervisor"]),
    spv_id: () => faker.random.number({ min: 5, max: 15 }),
  }),

  LoginPlanner: () => ({
    email: () => faker.internet.email(),
    password: () => faker.internet.password(),
    role: () => faker.random.arrayElement(["planner"]),
    spv_id: () => faker.random.number({ min: 5, max: 15 }),
  }),

  LoginWorker: () => ({
    email: () => faker.internet.email(),
    password: () => faker.internet.password(),
    role: () => faker.random.arrayElement(["worker"]),
    spv_id: () => faker.random.number({ min: 5, max: 15 }),
  }),

  UpdateStatusIsRead: () => ({
    id: () => faker.random.number({ min: 1, max: 10 }),
    project_id: () => faker.random.number({ min: 1, max: 10 }),
    assignee: () => faker.random.number({ min: 1, max: 10 }),
    title: () => faker.lorem.text(),
    description: () => faker.lorem.sentence(),
    start_date: () => faker.date.recent(),
    due_date: () => faker.date.soon(),
    attachment: () => "",
    status: () =>
      faker.random.arrayElement([
        "draft",
        "submit",
        "approved",
        "return",
        "reject",
        "todo",
        "doing",
        "done",
      ]),
    is_read: () => faker.random.arrayElement(["True"]),
  }),
  UpdateStatusDraft: () => ({
    id: () => faker.random.number({ min: 1, max: 10 }),
    project_id: () => faker.random.number({ min: 1, max: 10 }),
    assignee: () => faker.random.number({ min: 1, max: 10 }),
    title: () => faker.lorem.text(),
    description: () => faker.lorem.sentence(),
    start_date: () => faker.date.recent(),
    due_date: () => faker.date.soon(),
    attachment: () => "",
    status: () => faker.random.arrayElement(["Draft"]),
    is_read: () => faker.random.arrayElement(["False"]),
  }),
  UpdateStatusIsAproved: () => ({
    id: () => faker.random.number({ min: 1, max: 10 }),
    project_id: () => faker.random.number({ min: 1, max: 10 }),
    assignee: () => faker.random.number({ min: 1, max: 10 }),
    title: () => faker.lorem.text(),
    description: () => faker.lorem.sentence(),
    start_date: () => faker.date.recent(),
    due_date: () => faker.date.soon(),
    attachment: () => "",
    status: () => faker.random.arrayElement(["Approved"]),
    is_read: () => faker.random.arrayElement(["False"]),
  }),
  UpdateStatusIsReturn: () => ({
    id: () => faker.random.number({ min: 1, max: 10 }),
    project_id: () => faker.random.number({ min: 1, max: 10 }),
    assignee: () => faker.random.number({ min: 1, max: 10 }),
    title: () => faker.lorem.text(),
    description: () => faker.lorem.sentence(),
    start_date: () => faker.date.recent(),
    due_date: () => faker.date.soon(),
    attachment: () => "",
    status: () => faker.random.arrayElement(["Return"]),
    is_read: () => faker.random.arrayElement(["False"]),
  }),
  UpdateStatusReject: () => ({
    id: () => faker.random.number({ min: 1, max: 10 }),
    project_id: () => faker.random.number({ min: 1, max: 10 }),
    assignee: () => faker.random.number({ min: 1, max: 10 }),
    title: () => faker.lorem.text(),
    description: () => faker.lorem.sentence(),
    start_date: () => faker.date.recent(),
    due_date: () => faker.date.soon(),
    attachment: () => "",
    status: () => faker.random.arrayElement(["Reject"]),
    is_read: () => faker.random.arrayElement(["False"]),
  }),
  UpdateStatusTodo: () => ({
    id: () => faker.random.number({ min: 1, max: 10 }),
    project_id: () => faker.random.number({ min: 1, max: 10 }),
    assignee: () => faker.random.number({ min: 1, max: 10 }),
    title: () => faker.lorem.text(),
    description: () => faker.lorem.sentence(),
    start_date: () => faker.date.recent(),
    due_date: () => faker.date.soon(),
    attachment: () => "",
    status: () => faker.random.arrayElement(["Todo"]),
    is_read: () => faker.random.arrayElement(["False"]),
  }),
  UpdateStatusDoing: () => ({
    id: () => faker.random.number({ min: 1, max: 10 }),
    project_id: () => faker.random.number({ min: 1, max: 10 }),
    assignee: () => faker.random.number({ min: 1, max: 10 }),
    title: () => faker.lorem.text(),
    description: () => faker.lorem.sentence(),
    start_date: () => faker.date.recent(),
    due_date: () => faker.date.soon(),
    attachment: () => "",
    status: () => faker.random.arrayElement(["Doing"]),
    is_read: () => faker.random.arrayElement(["False"]),
  }),
  UpdateStatusDone: () => ({
    id: () => faker.random.number({ min: 1, max: 10 }),
    project_id: () => faker.random.number({ min: 1, max: 10 }),
    assignee: () => faker.random.number({ min: 1, max: 10 }),
    title: () => faker.lorem.text(),
    description: () => faker.lorem.sentence(),
    start_date: () => faker.date.recent(),
    due_date: () => faker.date.soon(),
    attachment: () => "",
    status: () => faker.random.arrayElement(["Done"]),
    is_read: () => faker.random.arrayElement(["False"]),
  }),

  TasksAttachment: () => ({
    id: () => faker.random.number({ min: 1, max: 10 }),
    project_id: () => faker.random.number({ min: 1, max: 10 }),
    assignee: () => faker.random.number({ min: 1, max: 10 }),
    title: () => faker.lorem.text(),
    description: () => faker.lorem.sentence(),
    start_date: () => faker.date.recent(),
    due_date: () => faker.date.soon(),
    attachment: () => faker.internet.url(),
    status: () => faker.random.arrayElement(["Done"]),
    is_read: () => faker.random.arrayElement(["False"]),
  }),

  Tasks: () => ({
    id: () => faker.random.number({ min: 1, max: 10 }),
    project_id: () => faker.random.number({ min: 1, max: 10 }),
    assignee: () => faker.random.number({ min: 1, max: 10 }),
    title: () => faker.lorem.text(),
    description: () => faker.lorem.sentence(),
    start_date: () => faker.date.recent(),
    due_date: () => faker.date.soon(),
    attachment: () => "",
    status: () =>
      faker.random.arrayElement([
        "draft",
        "submit",
        "approved",
        "return",
        "reject",
        "todo",
        "doing",
        "done",
      ]),
    is_read: () => faker.random.arrayElement(["False"]),
  }),
  Note: () => ({
    id: () => faker.random.number({ min: 1, max: 10 }),
    task_id: () => faker.random.number({ min: 1, max: 10 }),
    note: () => faker.lorem.text(),
  }),
};

const server = new ApolloServer({
  typeDefs,
  mocks,
  playground: {
    settings: {
      "editor.theme": "light",
    },
  },
  introspection: true,
});

server.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
