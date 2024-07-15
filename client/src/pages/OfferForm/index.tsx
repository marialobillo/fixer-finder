import { useState } from 'react'
import './OfferForm.css'
import { OfferData } from '../../types/offerTypes'

interface OfferFormProps {
  task: {
    id: string
    title: string
  }
  onSubmit: (offerData: OfferData) => void
  onCancel: () => void
}

const OfferForm = ({ task, onSubmit, onCancel }: OfferFormProps) => {
  const [offerData, setOfferData] = useState<OfferData>({
    offer_description: '',
    offer_media: null,
    posting_time: '',
    price: '',
    offer_status: 'pending',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOfferData({
      ...offerData,
      [event.target.name]: event.target.value,
    })
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setOfferData({
      ...offerData,
      offer_media: file,
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const offerPayload = {
      job_id: task.id,
      worker_id: '1',
      offer_description: offerData.offer_description,
      posting_time: offerData.posting_time,
      price: offerData.price,
      offer_status: offerData.offer_status,
      offer_media: offerData.offer_media,
    }

    onSubmit(offerPayload)
  }

  return (
    <div className='offer-form-content'>
      <h2>Make an Offer for {task.title}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          name='offer_description'
          placeholder='Offer Description'
          value={offerData.offer_description}
          onChange={handleChange}
          required
        />
        <input
          type='file'
          name='offer_media'
          accept='.jpg, .jpeg, .png, .gif, .pdf, .zip, .rar'
          multiple
          onChange={handleFileChange}
          required
        />
        <input
          type='datetime-local'
          name='posting_time'
          placeholder='Posting Time'
          value={offerData.posting_time}
          onChange={handleChange}
          required
        />
        <input
          type='number'
          name='price'
          placeholder='Price'
          value={offerData.price}
          onChange={handleChange}
          required
        />
        <input
          type='hidden'
          name='offer_status'
          placeholder='Offer Status'
          value={offerData.offer_status}
          onChange={handleChange}
          required
        />
        <button type='submit' className='submit-offer-btn'>
          Submit Offer
        </button>
        <button type='button' className='cancel-offer-btn' onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  )
}

export default OfferForm
