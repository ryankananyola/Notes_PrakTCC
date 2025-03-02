import express from "express"
import cors from "cors"
import NoteRoute from "./routes/notesRoutes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(NoteRoute)

app.listen(5000, () => console.log("Server Connected"))