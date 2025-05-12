import express, { json } from "express";
import cors from 'cors'
import contactRouter from "./router/contactRouter.js";
import phoneRouter from "./router/phoneRouter.js";

const app = express()
const PORT = 3000

// ----- 
app.use(cors())
app.use(json())
app.use(contactRouter);
app.use(phoneRouter)

app.listen(PORT || 3000, () => {
    console.log(`starting server at: http://localhost:${PORT}`);

})