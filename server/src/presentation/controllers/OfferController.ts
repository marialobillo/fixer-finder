import { Request, Response } from 'express'
import { Offer } from '../../domain/entities/offer';
import Joi from 'joi';
import { CreateOfferUseCase } from '../../application/use-cases/createOfferUseCase';
import { PostgreSQLOfferRepository } from '../../infrastructure/database/postgresql/PostgreSQLOfferRepository';
import { logger } from '../../logger';

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
    logger.info(`Received request to create offer: ${JSON.stringify(req.body)}`);
    try {
      const { error } = OfferSchema.validate(req.body)
      if (error) {
        logger.warn(`Validation failed: ${error.message}`);
        return res.status(400).json({ message: error.message })
      }
      const offerData = req.body
      logger.info(`Calling CreateOfferUseCase with data: ${JSON.stringify(offerData)}`);

      const offer = await this.createOfferUseCase.execute(offerData)
      logger.info(`Successfully created offer: ${JSON.stringify(offer)}`);
      res.status(201).json(offer)
    } catch (error: unknown) {
      if (isError(error)) {
        logger.error(`Error while creating offer: ${error.message}`, { stack: error.stack });
        return res.status(500).json({ message: error.message })
      } else {
        logger.error('An unexpected error occurred.', { error });
        return res.status(500).json({ message: 'An unexpected error occurred.' })
      }
    }
  }
}