import express, { json } from "express";
import cors from "cors";

const app = express();

app.use(json());
app.use(cors());

const port = 5000;

app.listen(port, () => console.log(`O servidor está online na porta ${port}`));