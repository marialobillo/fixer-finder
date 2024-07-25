import axios, { isAxiosError } from 'axios'
import { Offer } from '../types/offerTypes'

const baseUrl = 'http://localhost:4000'

const client = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const createOffer = async (offer: Offer): Promise<Offer> => {
  try {
    const response = await client.post<Offer>('/offers', offer)
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.status)
      console.error(error.response)
      throw new Error(error.response?.data.message || 'Failed to create offer')
    } else {
      throw new Error('Unexpected error occurred')
    }
  }
}