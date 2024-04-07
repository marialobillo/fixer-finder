import express, { Express, Request, Response } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import connectedDB from './config/connectionDB'

const port = process.env.PORT || 3040
const app = express()

// Middlewares
app.use(cors())
app.use(helmet())


app.get('/', (req: Request, res: Response) => {
	res.send
('Hiii!')
})


const start = async () => {
	try {
		await connectedDB()
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`)
		})
	} catch (error) {
		console.error('**** Server failed to start ****')
	}
}

start()