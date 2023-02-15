import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skill_level: "",
        number_of_players: 0,
        name: "",
        creator: "",
        description: "",
        game_type: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes()
        .then(setGameTypes)
    }, [])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function. 
        //Dynamically assigns the key and value from the dom event as a string
        //Requires for the integer data to be parsed before POST
        let copy = {...currentGame}
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentGame(copy)
    }
    

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                    onChange={(e)=>{
                        let copy = {...currentGame, name: e.target.value}
                        setCurrentGame(copy)}}
                    />
                    <label htmlFor="creator">Game Maker: </label>
                    <input 
                    type="text"
                    htmlFor="game_type"
                    onChange={(e)=>{
                        let copy = {...currentGame, creator : e.target.value}
                        setCurrentGame(copy)
                        }
                    }></input>
                    <label >Game Type: </label>
                    <select onChange={(e)=>{
                        let copy = {...currentGame, game_type : parseInt(e.target.value)}
                        setCurrentGame(copy)
                        }
                    }>
                        <option value={0}>Select a game type...</option>
                        {
                            gameTypes.map(type=>{
                                return <option key={type.id} value={type.id}>{type.label}</option>
                            })
                        }
                    </select>
                    <label htmlFor="description">Description: </label>
                    <textarea 
                    placeholder={"Type a description here..."}
                    onChange={(e)=>{
                        let copy = {...currentGame, description: e.target.value}
                        setCurrentGame(copy)
                    }}>
                    </textarea>
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <select onChange={(e)=>{
                        let copy = {...currentGame, skill_level: e.target.value}
                        setCurrentGame(copy)
                    }}>
                        <option value={0}>Choose a skill level...</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                    <label htmlFor="numOfPlayers">Number of Players</label>
                    <input 
                    type="number"
                    onChange={(e)=>{
                        let copy = {...currentGame, number_of_players : parseInt(e.target.value)}
                        setCurrentGame(copy)
                    }}/>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    const game = {...currentGame}
                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}