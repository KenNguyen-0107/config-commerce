import { getFactory as getBaseFactory } from "@packages/optimizely-cms-react/rsc";
import { cache } from 'react';

import CmsDictionary from "./cms";
import WidgetDictionary from "./widgets";

export const getFactory = cache(() => {
	const factory = getBaseFactory()

	const dictionary = [
		...CmsDictionary,
		...WidgetDictionary,
	]

	factory.registerAll(dictionary)

	return factory
})