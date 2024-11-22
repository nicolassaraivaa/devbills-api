import 'dotenv/config'
import express, { json } from 'express'

import { setupMongo } from './database'
import { routes } from './routes'
import { errorHandler } from './middleweres/error-handler.middleweres'


setupMongo().then(() => {
    const app = express()
    
    app.use(json())
    app.use(routes)
    app.use(errorHandler)
     
    app.listen(3333, () => console.log('🚀 App is runing at port 3333!'))
})

