import 'dotenv/config'
import express, { json } from 'express'
import { routes } from './routes'

import { setupMongo } from './database'

setupMongo().then(() =>{
    const app = express()
    app.use(routes)
    
    app.use(json())
    app.listen(3333, () => console.log('🚀 App is runing at port 3333!'))
})

