import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home.js"
import AddNotes from "./pages/AddNotes.js"
import UpdateNotes from "./pages/UpdateNotes.js"

function App(){
console.log("App component rendered")

  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/notes" element={<Home />}/>
        <Route path="/add-notes" element={<AddNotes />}/>
        <Route path="/update-notes/:id" element={<UpdateNotes />}/>
      </Routes>
    </Router>
  )
}

export default App