import { DateTimeFieldConverter } from "../components/game/DateTime"

export const GetEvents = () => {
    return fetch('http://localhost:8000/events', 
        {
            headers: {
                "Authorization" : `Token ${localStorage.getItem("lu_token")}`
            }
        }
    )
            .then(res=>res.json())
}

export const createEvent = (currentEvent) => {
    const event = {
        game: parseInt(currentEvent.game),
        date: DateTimeFieldConverter(currentEvent.date),
        location: currentEvent.location
    }
    return fetch('http://localhost:8000/events',
    {
        method: "POST",
        headers: {
            "Authorization" : `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(event)
    })
    .then(res=>res.json())
}

export const GetSingleEvent = (pk) => {
    return fetch(`http://localhost:8000/events/${pk}`, 
        {
            headers: {
                "Authorization" : `Token ${localStorage.getItem("lu_token")}`
            }
        }
    )
            .then(res=>res.json())
}

export const editEvent = (currentEvent, eventId) => {
    const event = {
        game: parseInt(currentEvent.game.id),
        date: DateTimeFieldConverter(currentEvent.date),
        location: currentEvent.location
    }
    return fetch(`http://localhost:8000/events/${eventId}`,
    {
        method: "PUT",
        headers: {
            "Authorization" : `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(event)
    })
}