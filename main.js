fetch("http://127.0.0.1:5500/data/pokemon.json")
    .then(response=>{
        return response.json()
    })
    .then(data => {
        console.log(data)
    })

