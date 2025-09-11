import { API_RESPONSE } from '../Utils/api-response.js'
import healthService from './health.service.js'
const health = async (req, res) => {
    const response = await healthService()
    if (response instanceof API_RESPONSE) {
        return res.status(response.statusCode || 200).json({
            message: response.message,
            success: response.isSuccess,
        })
    }
    res.status(400).json({
        message: 'App is not healthy',
        success: false,
    })
}
export default health
