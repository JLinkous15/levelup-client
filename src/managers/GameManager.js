export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleGame = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        headers: {
            "Authorization" : `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(res=>res.json())
}

export const getGamers = () => {
    return fetch("http://localhost:8000/gamers", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createGame = (currentGame) => {
    const game = {
        skill_level: currentGame.skill_level,
        number_of_players: parseInt(currentGame.number_of_players),
        name: currentGame.name,
        creator: currentGame.creator,
        description: currentGame.description,
        game_type: parseInt(currentGame.game_type)
    }
    return fetch("http://localhost:8000/games", 
    { 
        method : "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(game)
    })
        .then(res=>res.json())
}

export const getGameTypes = () => {
    return fetch("http://localhost:8000/gametypes", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(res=>res.json())
}

export const editGame = (id, currentGame) => {
    const game = {
        skill_level: currentGame.skill_level,
        number_of_players: parseInt(currentGame.number_of_players),
        name: currentGame.name,
        creator: currentGame.creator,
        description: currentGame.description,
        game_type: parseInt(currentGame.game_type)
    }
    return fetch(`http://localhost:8000/games/${id}`,{
        method: "PUT",
        headers: {
            "Authorization" : `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(game)
    })
}

export const deleteGame = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization" : `Token ${localStorage.getItem("lu_token")}`
        }
    })
}