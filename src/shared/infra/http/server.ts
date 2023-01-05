import 'reflect-metadata'
import 'dotenv/config'

import express, { Request, Response } from 'express'
import { errors } from 'celebrate'

import AppError from '../../errors/AppError'
import routes from './routes'

import '../typeorm'
import '../../container/index'
import upload from '@config/upload'

const app = express()

app.use(express.json())
app.use(routes)
app.use('/files', express.static(upload.uploadsFolder))

app.use(errors())

app.use((err: Error, req: Request, res: Response) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  console.log(err)

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  })
})

app.listen(process.env.PORT, () => console.log('App running on port 3333'))
