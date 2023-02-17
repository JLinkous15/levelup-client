import React, { useEffect, useState } from "react"
import { deleteEvent, GetEvents, joinEvent, leaveEvent } from "../../managers/EventManager.js"
import { useNavigate } from "react-router-dom"
import { DateTimeConverter } from "./DateTime.js"

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
                    const [date, time] = DateTimeConverter(event.date)
                    return <section key={`event--${event.id}`} className="event">
                        <div className="game__title">
                            {event.host.full_name} brings you {event.game.name} by {event.game.creator}
                        </div>
                        <div className="game__players">
                            {event.game.number_of_players} players  for the {date} at {time} at {event.location}
                        </div>
                        <div className="game__skillLevel">
                            Skill level is {event.game.skill_level}
                        </div>
                        <label htmlFor="Attendees">Attendees: </label>
                        {event.attendance.map(gamer=><div key={gamer.id}>{gamer.full_name}</div>)}
                        {event.is_host
                        ?<>
                            <button
                            onClick={()=>navigate(`/events/${event.id}`)}>
                                Edit
                            </button>
                            <button
                            onClick={()=>{
                                deleteEvent(event.id)
                                .then(()=>{
                                    GetEvents()
                                    .then(setEvents)
                                }
                                )}}>
                                Delete
                            </button>
                        </>
                        :""
                        }
                        {event.joined
                        ?<button
                        onClick={(e)=>{
                            e.preventDefault()
                            leaveEvent(event.id)
                            .then(()=>{GetEvents().then(setEvents)})
                            
                            }
                        }>
                            Leave
                        </button>
                        :<button
                        onClick={(e)=>{
                            e.preventDefault()
                            joinEvent(event.id)
                            .then(()=>{GetEvents().then(setEvents)})
                            
                        }}>Join</button>}
                    </section>
    })
            }
        </article>
        </>
    )
}