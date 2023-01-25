require("dotenv").config();
const COINRIMP_TOKEN = process.env.COINRIMP_TOKEN
const BASE_COINRIMP = process.env.BASE_COINRIMP
const FEE_ACCOUNT = process.env.FEE_ACCOUNT_ID
const URL = process.env.BASE_ZUGAVALIZE;
const providerID = process.env.SWAP_PROVIDER_ID;

module.exports = {FEE_ACCOUNT, URL, COINRIMP_TOKEN, BASE_COINRIMP, providerID}