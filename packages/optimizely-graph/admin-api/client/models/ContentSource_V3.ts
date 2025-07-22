/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContentTypeMap_V3 } from './ContentTypeMap_V3';
import type { LinkMap } from './LinkMap';
import type { Optional_string_ } from './Optional_string_';
import type { Preset } from './Preset';
import type { PropertyTypeMap_V3 } from './PropertyTypeMap_V3';
export type ContentSource_V3 = {
    languages?: Array<string>;
    contentTypes?: ContentTypeMap_V3;
    propertyTypes?: PropertyTypeMap_V3;
    links?: LinkMap;
    label?: Optional_string_;
    description?: Optional_string_;
    useTypedFieldNames?: boolean;
    preset?: Preset;
};

