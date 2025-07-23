import { BuildTagsParams } from "../types";
import buildTags from "./buildTags";

export const WithHead = (props: BuildTagsParams) => {
	const tags = buildTags(props);
	return tags;
};
