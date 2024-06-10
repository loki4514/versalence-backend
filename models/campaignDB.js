import mongoose from 'mongoose'
const { Schema } = mongoose;
const CampaignScheme = new Schema({
    Campaign_Name: { type: String, required: true },
    Template_Name: { type: String, required: true },
    Template_Variable_Values: { type: String, required: true },
    WAMID: { type: String, required: true },
    Status: { type: String, enum: ['Active', 'Inactive'], default : "Inactive" },
    Customer_Action: { type: String, default: '' },
    Sent_Date: { type: String, required: true }
})

export default mongoose.model('company_campaign_details',CampaignScheme)