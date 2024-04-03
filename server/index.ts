import express, { Express, Request, Response } from 'express'

const port = 8000
const app: Express = express()

app.get('/', (req: Request, res: Response) => {
	res.send
('Hello from Typescript with Nodejs')
})

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})