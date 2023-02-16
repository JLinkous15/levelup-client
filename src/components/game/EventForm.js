import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createEvent, editEvent, GetSingleEvent } from "../../managers/EventManager.js"
import { getGames } from '../../managers/GameManager.js'
import { DateTimeFieldConverter, DefaultDate } from "./DateTime.js"


export const EventForm = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const [currentEvent, setCurrentEvent] = useState({
        game: 0,
        date: "",
        location: ""
    })
    
    let {eventId} = useParams()

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGames()
        .then(setGames)

        if(eventId){
            GetSingleEvent(eventId)
            .then(setCurrentEvent)
        }
    }, [eventId])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function. 
        //Dynamically assigns the key and value from the dom event as a string
        //Requires for the integer data to be parsed before POST
        let copy = {...currentEvent}
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(copy)
    }
console.log(DefaultDate(currentEvent.date))
    return (
        <form className="eventForm">
            <h2 className="eventForm__title">
                {eventId
                ?"Edit Event"
                :"Register New Event"}
            </h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="event">Choose a Game</label>
                    <select 
                    name="game"
                    value={currentEvent.game.id}
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
                    <input 
                    type="datetime-local" 
                    name="date" 
                    defaultValue={`${DefaultDate(currentEvent.date)}`}
                    onChange={changeEventState}/>
                    <label htmlFor="location">Choose a Location:</label>
                    <input 
                    type="text" 
                    name="location" 
                    defaultValue={currentEvent.location}
                    onChange={changeEventState}/>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            {eventId
                ?<button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    const event = {
                        game: parseInt(currentEvent.game),
                        date: DateTimeFieldConverter(currentEvent.date),
                        location: currentEvent.location
                    }
                    // Send POST request to your API
                    editEvent(event, eventId)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">
                    Edit
                </button>
                :<button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    const event = {
                        game: parseInt(currentEvent.game),
                        date: DateTimeFieldConverter(currentEvent.date),
                        location: currentEvent.location
                    }
                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">
                    Create
                </button>
                }
        </form>
    )
}