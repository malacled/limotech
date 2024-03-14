const fs = require('fs')

// access global mock db file
const fleets = require(global.fleet_db)

// write service method implementations
const fleet_service = {
    getAll() {
        return fleets
    },
    getById(id) {
        return fleets.find(t => t.id == id)
    },
    create(req, res) {
        let new_id = genRandId(4)
        
        const fleet = req.body

        const new_fleet = {
            id: new_id,
            fleet: fleet
        }

        fleets.push(new_fleet)
        
        writeToFile(fleets)
        
        return new_fleet
    },
    update(id, updateData){
        const fleetIndex = fleets.findIndex(t => t.id == id)

        if (fleetIndex === -1) {
            return null
        }

        fleets[fleetIndex].fleet = { ...fleets[fleetIndex].fleet, ...updateData }

        writeToFile(fleets)

        return fleets[fleetIndex]
    },
    delete(id) {
        const index = fleets.findIndex(u => u.id == id)
        fleets.splice(index, 1)
        writeToFile(fleets)
    }
}

// create function for overwriting the db file updated db content
let writeToFile = async (users) => {
    await 
        fs.writeFileSync(
            global.fleet_db,
            JSON.stringify(
                users, null, 4
            ),
            'utf8'
        )
}

// generate random id inspired by uuid
let genRandId = (count) =>{
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < count; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

module.exports = fleet_service