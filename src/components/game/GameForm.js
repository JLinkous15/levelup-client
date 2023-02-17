import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createGame, editGame, getGameTypes, getSingleGame } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])
    let {gameId} = useParams()

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

        if(gameId){
            getSingleGame(gameId)
            .then(setCurrentGame)
        }
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
                    <input 
                    type="text" 
                    name="name" 
                    className="form-control"
                    defaultValue={currentGame.name}
                    onChange={changeGameState}
                    required autoFocus
                    />

                    <label name = "creator" htmlFor="creator">Game Maker: </label>
                    <input 
                    type="text"
                    name="creator"
                    defaultValue={currentGame.creator}
                    onChange={changeGameState}/>

                    <label htmlFor="game_type">Game Type: </label>
                    <select 
                    name="game_type"
                    value={currentGame.game_type}
                    onChange={changeGameState}>
                        <option value={0}>Select a game type...</option>
                        {
                            gameTypes.map(type=>{
                                return <option key={type.id} value={type.id}>{type.label}</option>
                            })
                        }
                    </select>

                    <label htmlFor="description">Description: </label>
                    <textarea 
                    name="description"
                    defaultValue={currentGame.description}
                    placeholder={"Type a description here..."}
                    onChange={changeGameState}>
                    </textarea>

                    <label htmlFor="skillLevel">Skill Level: </label>
                    <select 
                    name="skill_level"
                    value={currentGame.skill_level}
                    onChange={changeGameState}>
                        <option value={0}>Choose a skill level...</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>

                    <label
                    htmlFor="numOfPlayers">
                        Number of Players
                    </label>
                    <input 
                    name="number_of_players"
                    type="number"
                    value={currentGame.number_of_players}
                    onChange={changeGameState}/>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            {gameId
            ?<button 
            type="submit"
            onClick={evt => {
                // Prevent form from being submitted
                evt.preventDefault()
                // Send POST request to your API
                editGame(gameId, currentGame)
                    .then(() => navigate("/"))
            }}
            className="btn btn-primary">
                Edit    
            </button>
            :<button 
            type="submit"
            onClick={evt => {
                // Prevent form from being submitted
                evt.preventDefault()
                // Send POST request to your API
                createGame(currentGame)
                    .then(() => navigate("/"))
            }}
            className="btn btn-primary">
                Create
            </button>
            }
        </form>
    )
}