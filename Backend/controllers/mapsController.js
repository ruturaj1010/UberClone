const mapService = require('../services/maps.service');

module.exports = async (req, res) => {

    const { address } = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinates(address);
        res.status(200).json({
            success: true,
            data: coordinates
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Failed to get coordinates'
        });
    }
}