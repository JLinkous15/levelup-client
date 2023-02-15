import React, { useEffect, useState } from "react"
import { GetEvents } from "../../managers/EventManager.js"
import { useNavigate } from "react-router-dom"

export const EventList = () => {
    const [events, setEvents] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        GetEvents()
        .then(setEvents)
    }, [])
    return (<>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "/events/new" })
            }}
        >
            Register New Event
        </button>
        <article className="events">
            {
                events.map(event=>{
                    return <section key={`event--${event.id}`} className="event">
                        <div className="game__title">
                            {event.host.full_name} bring you {event.game.name} by {event.game.creator}
                        </div>
                        <div className="game__players">
                            {event.game.number_of_players} players needed
                        </div>
                        <div className="game__skillLevel">
                            Skill level is {event.game.skill_level}
                        </div>
                    </section>
    })
            }
        </article>
        </>
    )
}