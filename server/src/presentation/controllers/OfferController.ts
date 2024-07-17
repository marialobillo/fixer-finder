import { Request, Response } from 'express'
import { Offer } from '../../domain/entities/offer';
import Joi from 'joi';
import { CreateOfferUseCase } from '../../application/use-cases/createOfferUseCase';
import { PostgreSQLOfferRepository } from '../../infrastructure/database/postgresql/PostgreSQLOfferRepository';


function isError(error: unknown): error is Error {
  return error instanceof Error;
}

const OfferSchema = Joi.object({
  id: Joi.string().optional(),
  offerDescription: Joi.string().required(),
  offerMedia: Joi.string().optional(),
  offerStatus: Joi.string().required(),
  price: Joi.number().required(),
  postingTime: Joi.date().required(),
  jobId: Joi.string().required(),
  workerId: Joi.string().required()
})

export class OfferController {
  private createOfferUseCase: CreateOfferUseCase

  constructor() {
    const offerRepository = new PostgreSQLOfferRepository()
    this.createOfferUseCase = new CreateOfferUseCase(offerRepository)
  }

  async createOffer(req: Request, res: Response): Promise<Response | void>  {
    try {
      const { error } = OfferSchema.validate(req.body)
      if(error) {
        return res.status(400).json({ message: error.message })
      }
      const offerData = req.body
      const offer = await this.createOfferUseCase.execute(offerData)
      res.status(201).json(offer)
    } catch (error: unknown) {
      if(isError(error)) {
        return res.status(500).json({ message: error.message })
      } else {
        return res.status(500).json({ message: 'An unexpected error occurred.' })
      }
    }
  }
}