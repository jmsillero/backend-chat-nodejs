const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN)
    console.log('Database Connected!!')
  } catch (error) {
    console.log('Error loading database', error)
  }
}

module.exports = {
  dbConnection,
}
