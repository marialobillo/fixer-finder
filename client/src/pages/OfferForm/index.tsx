import { useState }from 'react'
import './OfferForm.css'

interface OfferData {
  offer_description: string
  offer_media: string
  posting_time: string
  price: string
  offer_status: string
}

interface OfferFormProps {
  task: {
    id: string
    title: string
  }
  onSubmit: (offerData: OfferData) => void
  onCancel: () => void
}

const OfferForm = ({ task, onSubmit, onCancel }: OfferFormProps) => {
  const [offerData, setOfferData] = useState({
    offer_description: '',
    offer_media: '',
    posting_time: '',
    price: '',
    offer_status: ''
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOfferData({
      ...offerData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const offerPayload = {
      job_id: task.id,
      worker_id: '1',
      ...offerData
    }
    onSubmit(offerPayload)
  }

  return (
    <div className="offer-form-content">
      <h2>Make an Offer for {task.title}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          name="offer_description"
          placeholder="Offer Description"
          value={offerData.offer_description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="offer_media"
          placeholder="Offer Media"
          value={offerData.offer_media}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="posting_time"
          placeholder="Posting Time"
          value={offerData.posting_time}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={offerData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="offer_status"
          placeholder="Offer Status"
          value={offerData.offer_status}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-offer-btn">Submit Offer</button>
        <button type="button" className="cancel-offer-btn" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  )

}

export default OfferForm
