import React from "react"
import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom"
import Search from "./pages/Search"
import PlayingVideo from "./pages/PlayingVideo"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Auth from "./components/Auth"

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route>
            <Route path="/" exact element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/search/:serachQuery" element={<Search />} />
            <Route path="/video/:id" element={<PlayingVideo />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
