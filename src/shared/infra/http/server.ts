import 'reflect-metadata'
import 'dotenv/config'

import express, { NextFunction, Request, Response } from 'express'

import cors from 'cors'

import { errors } from 'celebrate'
import routes from './routes'
import AppError from '../../errors/AppError'

import '../typeorm'
import '../../container/index'
import upload from '@config/upload'
import { rateLimiter } from './midllewares/rateLimiter'

const app = express()

app.use(rateLimiter)
app.use(cors())
app.use(express.json())
app.use('/files', express.static(upload.uploadsFolder))
app.use(routes)

app.use(errors())

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
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
