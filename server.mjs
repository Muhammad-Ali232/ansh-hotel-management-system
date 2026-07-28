import express from 'express'
import cors from 'cors'
import routes from './routes/allroutes.mjs'
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors())
app.use(routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
