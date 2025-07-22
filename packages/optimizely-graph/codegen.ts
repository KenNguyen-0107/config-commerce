import { readEnvironmentVariables, applyConfigDefaults, validateConfig, type OptimizelyGraphConfig } from './config'

export function getGraphQLCodegenSchema(config?: OptimizelyGraphConfig): SchemaInfo {
    const graphConfig = applyConfigDefaults(config ?? readEnvironmentVariables())
    if (!validateConfig(graphConfig, true))
        throw new Error("Invalid Optimizely Graph configuration")

    // Create connection information for Optimizely Graph
    const cgGateway = `${graphConfig.gateway}/content/v2?cache=false`
    const schemaInfo: SchemaInfo = {}
    schemaInfo[cgGateway] = {
        headers: {
            Authorization: `epi-single ${ graphConfig.single_key }`,
            "X-Client": "@Niteco/OptimizelyGraphClient"
        }
    }
    return schemaInfo
}

export type SchemaInfo = {
    [schemaUri: string]: {
        headers?: {
            [headerName: string]: string
        }
    }
}

export default getGraphQLCodegenSchema