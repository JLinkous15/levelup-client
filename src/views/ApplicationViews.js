import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { EventForm } from "../components/game/EventForm"
import { EventList } from "../components/game/EventList"
import { GameForm } from "../components/game/GameForm"
import { GameList } from "../components/game/GameList"
import { Authorized } from "./Authorized"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<GameList />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/games/new" element={<GameForm />} />
                <Route path="/games/:id" element={<GameForm />} />
                <Route path="/events/new" element={<EventForm />} />
                <Route path="/events/:eventId" element={<EventForm />} />
                {/* Add Routes here */}
            </Route>
        </Routes>
    </>
}
