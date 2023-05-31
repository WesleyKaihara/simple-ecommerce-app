const express = require("express");
const z = require("zod");
const bcrypt = require("bcrypt");
const { createUser, findByEmail } = require("../database/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

const UserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8)
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})


router.get("/users", (req,res) => {
  res.json("asdasdas")
});

router.post("/register", async(req,res) => {
  try {
    const user = UserSchema.parse(req.body); 
    
    const hashedPassword = bcrypt.hashSync(user.password,10);
    user.password = hashedPassword;

    const newUser = await createUser(user);
    delete newUser.password;

    return res.json({ user: newUser });
  } catch (err) {
    if(err instanceof z.ZodError) {
      res.status(422).json({
        message: err.errors
      })
    }
  }
  res.status(500).json({
    message: "Server error"
  })
});

router.post("/login", async(req,res) => {
  try {
    const data = LoginSchema.parse(req.body); 

    const user = await findByEmail(data.email);
    if(!user) return res.status(401).send();

    const validCredentials = bcrypt.compareSync(data.password,user.password);
    if(!validCredentials) return res.status(401).send();

    const token = jwt.sign({
      userId: user.id
    }, 
    process.env.SECRET);

    return res.json({ token });
  } catch (err) {
    if(err instanceof z.ZodError) {
      res.status(422).json({
        message: err.errors
      })
    }
    console.log(err)
  }
  res.status(500).json({
    message: "Server error"
  })
});

router.put("/user/:id", (req,res) => {
  const id = Number(req.params.id);
  res.json("asdasdas")
});

router.delete("/user/:id", (req,res) => {
  const id = Number(req.params.id);
  res.json("asdasdas")
});

module.exports = router;