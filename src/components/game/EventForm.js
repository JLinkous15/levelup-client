import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGames, getGamers } from '../../managers/GameManager.js'


export const EventForm = () => {
    const navigate = useNavigate()
    const [gamers, setGamers] = useState([])
    const [games, setGames] = useState([])
    const [currentEvent, setCurrentEvent] = useState({
        host: 0,
        game: 0,
        date: "",
        location: ""
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGames()
        .then(setGames)

        getGamers()
        .then(setGamers)
    }, [])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function. 
        //Dynamically assigns the key and value from the dom event as a string
        //Requires for the integer data to be parsed before POST
        let copy = {...currentEvent}
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(copy)
    }
    

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Choose a Game</label>
                    <select 
                    name="game"
                    onChange={changeEventState}>
                        <option value={0}>Games...</option>
                        {
                            games.map(game=>{
                                return <option key={game.id} value={game.id}>
                                    {game.name}
                                </option>
                            })
                        }
                    </select>
                    <label htmlFor="date">Choose a Date:</label>
                    <input type="date" name="date" onChange={changeEventState}/>
                    <label htmlFor="location">Choose a Location:</label>
                    <input type="text" name="location" onChange={changeEventState}/>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    const game = {...currentEvent}
                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}