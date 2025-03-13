const dashboardService = require('../services/dashboard.service');


const getKPIs = async (req, res) => {
    try {
        const kpis = await dashboardService.getKPIs();
        res.status(200).json(kpis);
    } catch (error) {
        res.status(500).json({ message: "something went wrong. please try again later!" });
    }
}

const getOrderTrends = async (req, res) => {
    try {
        const orderTrends = await dashboardService.getOrderTrends();
        res.status(200).json(orderTrends);
        
    } catch (error) {
        res.status(500).json({ message: "something went wrong. please try again later!" });
        
    }
}

const getRevenueBreakdown = async (req, res) => {

    try {
        const revenueBreakdown = await dashboardService.getRevenueBreakdown();
        res.status(200).json(revenueBreakdown);
        
    } catch (error) {
        res.status(500).json({ message: "something went wrong. please try again later!" });
        
    }
}

module.exports = {
    getKPIs,
    getOrderTrends,
    getRevenueBreakdown
};