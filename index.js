const express = require("express");
const app = express();

app.use(express.json());

let users = [];

/* Middleware Authorization */
app.use((req, res, next) => {
    if (req.headers.authorization !== "fha5HpDXSXSjKU0QCbdXiz1a") {
        return res.status(403).json({ message: "No autorizado" });
    }
    next();
});

/* Middleware Token para métodos que no sean GET */
app.use((req, res, next) => {
    if (req.method !== "GET") {
        if (req.headers.token !== "HIZe4D32twWOUP9h0I1IVTlr") {
            return res.status(403).json({ message: "Token inválido" });
        }
    }
    next();
});

/* GET */
app.get("/users", (req, res) => {
    res.json(users);
});

/* POST */
app.post("/users", (req, res) => {
    users.push(req.body);
    res.json({ message: "Usuario creado", users });
});

/* PUT */
app.put("/users/:id", (req, res) => {
    users[req.params.id] = req.body;
    res.json({ message: "Usuario actualizado", users });
});

/* DELETE */
app.delete("/users/:id", (req, res) => {
    users.splice(req.params.id, 1);
    res.json({ message: "Usuario eliminado", users });
});

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});