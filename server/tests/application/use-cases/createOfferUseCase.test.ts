import { CreateOfferUseCase } from "../../../src/application/use-cases/createOfferUseCase"
import { Offer, OfferProps } from "../../../src/domain/entities/offer"
import { OfferRepository } from "../../../src/infrastructure/persistence/OfferRepository"


describe('Create Offer Use Case', () => {
  let offerRepository: jest.Mocked<OfferRepository>
  let createOfferUseCase: CreateOfferUseCase
  let offerProps: OfferProps

  beforeEach(() => {
    offerRepository = {
      create: jest.fn(),
      getAll: jest.fn()
    } as jest.Mocked<OfferRepository>
    createOfferUseCase = new CreateOfferUseCase(offerRepository)
    offerProps = {
      offerDescription: 'Description of Offer 1',
      offerMedia: 'media1',
      price: 100,
      postingTime: new Date(),
      offerStatus: 'open',
      jobId: '1',
      workerId: '1',
    }
  })

  it('should create an offer with correct properties', async () => {
    const expectedOffer = new Offer({ ...offerProps, id: '1'})
    offerRepository.create.mockResolvedValue(expectedOffer)

    const offer = await createOfferUseCase.execute(offerProps)

    expect(offer.offerDescription).toBe(offerProps.offerDescription);
    expect(offer.offerMedia).toBe(offerProps.offerMedia);
    expect(offer.price).toBe(offerProps.price);
    expect(offer.postingTime).toBe(offerProps.postingTime);
    expect(offer.offerStatus).toBe(offerProps.offerStatus);
    expect(offer.jobId).toBe(offerProps.jobId);
    expect(offer.workerId).toBe(offerProps.workerId);
  })

  it('should assign a unique id to each created offer', async () => {
    const offer1 = new Offer({...offerProps, id: '1'});
    const offer2 = new Offer({...offerProps, id: '2'});

    offerRepository.create.mockResolvedValueOnce(offer1).mockResolvedValueOnce(offer2);

    expect(offer1.id).not.toBeUndefined();
    expect(offer2.id).not.toBeUndefined();
    expect(offer1.id).not.toBe(offer2.id);
  })
})