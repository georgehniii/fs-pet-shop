//connecting to the database........
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'puser',
  host: 'localhost',
  database: 'petShop',
  password: 'asd123',
  port: 5432,
})


const getPets = async (req, res) => {
    try{
    await pool.query('SELECT * FROM pets', (err, results) => {
      res.status(200).json(results.rows)
    })
     } catch (error){
          console.err(err.message)
      }
   
  }

const getPetById = (req, res) => {
    const id = req.params.id
    pool.query('SELECT * FROM pets WHERE pet_id = $1', [id], (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json(results.rows)
    })
}

const createPet = (req, res) => {
    const {name, age, kind} = req.body

    pool.query('INSERT INTO pets (name, age, kind) VALUES ($1, $2, $3)', [name, age, kind], (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).send('Pet added')

    })
}

const updatePets = (req, res) => {
    const id = req.params.id;
    const {name, age, kind} = req.body
    
    pool.query(
        'UPDATE pets SET name = $1, age = $2, kind = $3 WHERE pet_id = $4',
        [name, age, kind, id], (err, results) => {
            if (err) {
                res.send('Usage: name, age, kind')
                throw err
              }
              res.status(200).send(`Pet modified with ID: ${id}`)
        }
    )
}

const deletePet = (req, res) => {
   const id = req.params.id
    
    
    pool.query(
        `DELETE FROM pets WHERE pet_id = ${id}`, (err, results) => {
            if (err) {
                throw err
              }
              res.status(200).send(`Pet deleted`)
        }
    )
}








module.exports = {
    getPets,
    getPetById,
    createPet,
    updatePets,
    deletePet
  }