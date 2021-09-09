const dataService = require("./services/data.service");

const session = require("express-session");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",

    credentials: true,
  })
);

app.use(
  session({
    secret: "randomsecurestring",
    resave: false,
    saveUninitialized: false,
  })
);
//  const loginMiddleware = (req,res,next)=>{
//     console.log(req.body)
//     next()
// }
// app.use(loginMiddleware);

//  app.use((req,res,next)=>{
//      console.log(req.body)
//      next()
//  })
const authMiddleware = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.json({
      status: false,
      statusCode: 401,
      message: "please login",
    });
  } else {
    next();
  }
};

app.use(express.json());

app.get("/", (req, res) => {
  res.status(299).send("Get method");
});

app.post("/", (req, res) => {
  res.send("Post method");
});

app.post("/register", (req, res) => {
  dataService
    .register(req.body.acno, req.body.username, req.body.password)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });

  //  console.log(req.body);
  // const result = dataService.register(req.body.acno,req.body.username,req.body.password);
  // console.log(res.send(result.message));
  //  console.log(res.status(result.statusCode).json(result));
});
app.post("/login", (req, res) => {
  //   console.log(req.body);
  dataService.login(req, req.body.acno, req.body.password).then((result) => {
    res.status(result.statusCode).json(result);
  });
  // console.log(res.send(result.message));
  //console.log(res.status(result.statusCode).json(result));
});
app.post("/deposit", authMiddleware, (req, res) => {
  dataService
    .deposit(req.body.acno, req.body.password, req.body.amount)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
  //   console.log(req.body);
  // console.log(req.session.currentUser);
  // const result = dataService.deposit(req.body.acno,req.body.password,req.body.amount);
  // //console.log(res.send(result.message));
  // console.log(res.status(result.statusCode).json(result));
});
app.post("/withdraw", authMiddleware, (req, res) => {
  // console.log(req.body);
  dataService
    .withdraw(req, req.body.acno, req.body.password, req.body.amount)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
  //  console.log(res.send(result.message));
  //console.log(res.status(result.statusCode).json(result));
});
app.put("/", (req, res) => {
  res.send("Put method");
});
app.patch("/", (req, res) => {
  res.send("Patch method");
});
app.delete("/", (req, res) => {
  res.send("Delete method");
});

app.listen(3000, () => {
  console.log(" server will run at port 3000");
});
