import { API_RESPONSE } from '../Utils/api-response.js'
import { logger } from '../Utils/logger.js'
import { Logger } from 'winston'
const healthService = () => {
    logger.info('health check running')
    return new API_RESPONSE(200, 'app is running')
}
export default healthService
