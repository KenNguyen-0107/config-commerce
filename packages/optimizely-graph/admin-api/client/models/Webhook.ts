/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Preset } from './Preset';
import type { WebhookPayload } from './WebhookPayload';
export type Webhook = (WebhookPayload & {
    preset: Preset;
    id: string;
});

