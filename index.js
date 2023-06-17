import * as url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
import express from "express";
const app = express();
import path from "path";
import { v4 as uuid } from "uuid";
import methodOverride from "method-override";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

let comments = [
  {
    id: uuid(),
    username: "Kevin",
    comment: "Te amo Engi",
  },
  {
    id: uuid(),
    username: "Engiber",
    comment: "Te amo Max",
  },
  {
    id: uuid(),
    username: "Max",
    comment: "No me caes bien, Zeus",
  },
  {
    id: uuid(),
    username: "Hemera",
    comment: "Estoy loquisima",
  },
  {
    id: uuid(),
    username: "Zeus",
    comment: "Si cuadra",
  },
];

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newCommentText;
  res.redirect("/comments");
});

app.delete("/comments/:id/", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

app.listen(3000, () => {
  console.log("Port 3000 active");
});
