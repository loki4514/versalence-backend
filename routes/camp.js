import express from 'express'
import { postCampaign } from '../controllers/campaignapi.js'

const router = express.Router();

router.post('/postCampaign',postCampaign)

export default router