
import campaignDB from "../models/campaignDB.js";
import mongoose from "mongoose";

export const postCampaign = async (req, res) => {
    try {
        const { campaign_name, template_name, template_variable_values, WAMID, status, customer_action, sent_date } = req.body;
    

        if (campaign_name === "" || !campaign_name) {
            return res.status(400).send({
                message: "Campaign name is required"
            });
        }

        if (template_name === "" || !template_name) {
            return res.status(400).send({
                message: "Template name is required"
            });
        }

        // Check if template_variable_values is empty or not provided
        if (template_variable_values === "" || !template_variable_values) {
            return res.status(400).send({
                message: "Template variable values are required"
            });
        }

        // Check if WAMID is empty
        if (WAMID === "" || !WAMID) {
            return res.status(400).send({
                message: "WAMID is required"
            });
        }

        if (status === "" || !status) {
            return res.status(400).send({
                message: "Please select the status"
            })
        }

        if (sent_date === "" || !sent_date) {
            return res.status(400).send({
                message: "Date is required"
            })
        }

        let new_date
        if (sent_date.includes("T")) {
            let temp = sent_date.split("T")[0]
            temp = temp.split("-")
            if (temp.length === 3) {
                new_date = `${temp[2] - temp[1] - temp[0]}`
            } else {
                new_date = sent_date
            }
        } else {
            new_date = sent_date
        }
        const newCampaign = new campaignDB({
            Campaign_Name: campaign_name,
            Template_Name: template_name,
            Template_Variable_Values: template_variable_values,
            WAMID,
            Status: status,
            Customer_Action: customer_action,
            Sent_Date: sent_date
        });
        const savedCampaign = await newCampaign.save();
        return res.status(201).json({message : "Campaign data has been created sucessfully"});
    } catch (error) {
        console.log("Error in api", error)
        return res.status(500).json({
            message: "Something went wrong, please try again later"
        })
    }
}
