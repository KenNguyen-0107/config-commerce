export { ContentGraphClient } from './client'
export { createHmacFetch } from '../hmac-fetch'
export { isContentGraphClient, isOptiGraphClient, isOptiGraphConfig } from './utils'
export { OptiCmsSchema, AuthMode, type IOptiGraphClient, type ClientFactory } from './types'


import type { OptimizelyGraphConfig } from '../types'
import { AuthMode, type IOptiGraphClient } from './types'
import { ContentGraphClient } from './client'

/**
 * Create a new instance of the default Optimizely Graph client
 * 
 * @param   config   The client configuration
 * @param   token    The authentication token to apply to the client
 * @returns The newly created instance
 */
export function createClient(config?: OptimizelyGraphConfig, token?: string | undefined): IOptiGraphClient
{
    return new ContentGraphClient(config, token)
}

export default createClient