/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';
import { BestBetsService } from './services/BestBetsService';
import { DefinitionV2Service } from './services/DefinitionV2Service';
import { DefinitionV3Service } from './services/DefinitionV3Service';
import { LogsService } from './services/LogsService';
import { OidcService } from './services/OidcService';
import { QueryGraphQlService } from './services/QueryGraphQlService';
import { ResourcesService } from './services/ResourcesService';
import { WebhooksService } from './services/WebhooksService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class OptimizelyGraphAdminApi {
    public readonly bestBets: BestBetsService;
    public readonly definitionV2: DefinitionV2Service;
    public readonly definitionV3: DefinitionV3Service;
    public readonly logs: LogsService;
    public readonly oidc: OidcService;
    public readonly queryGraphQl: QueryGraphQlService;
    public readonly resources: ResourcesService;
    public readonly webhooks: WebhooksService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'https://prod.cg.optimizely.com',
            VERSION: config?.VERSION ?? '3.13.3',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.bestBets = new BestBetsService(this.request);
        this.definitionV2 = new DefinitionV2Service(this.request);
        this.definitionV3 = new DefinitionV3Service(this.request);
        this.logs = new LogsService(this.request);
        this.oidc = new OidcService(this.request);
        this.queryGraphQl = new QueryGraphQlService(this.request);
        this.resources = new ResourcesService(this.request);
        this.webhooks = new WebhooksService(this.request);
    }
}

