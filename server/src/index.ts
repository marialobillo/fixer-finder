import { app } from './infrastructure/express/app';
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})