export const createOffersTable = `
  CREATE TABLE IF NOT EXISTS offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offer_description TEXT NOT NULL,
    offer_media TEXT,
    posting_time TIMESTAMP DEFAULT NOW(),
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    offer_status TEXT NOT NULL CHECK (offer_status IN ('PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED')),
    job_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    worker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
`;