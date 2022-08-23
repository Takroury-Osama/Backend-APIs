const express = require('express')
const app = express()
const { sequelize } = require('./app/models/index')

const PORT = process.env.PORT || 3000

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(require('./app/router/routes'));

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)

  sequelize.authenticate()
  .then(() => {
    console.log(`Connected to database`)
  })
  .catch(err => console.log("Error " + err))
})