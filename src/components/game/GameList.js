import React, { useEffect, useState } from "react"
import { deleteGame, getGames } from "../../managers/GameManager.js"
import { useNavigate } from "react-router-dom"
import './Game-Event.css'

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "/games/new" })
            }}
        >
            Register New Game
        </button>
        <article className="games">
            {
                games.map(game => {
                    return <div key={`game--${game.id}`}>
                    <section  className="game">
                        <div className="game__title">{game.name} by {game.creator}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                    </section>
                    <button
                    onClick={()=>{
                        navigate(`/games/${game.id}`)
                    }}>Edit</button>
                    <button
                    onClick={()=>{
                        deleteGame(game.id)
                        .then(()=>{
                            getGames()
                            .then(setGames)
                        })
                    }}>Delete</button>
                    </div>
                })
            }
        </article>
        </>
    )
}