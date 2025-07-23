import {
	ComponentTypeDictionary,
	getFactory as getBaseFactory,
} from "@packages/optimizely-cms-react/rsc";
import { cache } from "react";

import CmsDictionary from "./cms";
import WidgetDictionary from "./widgets";

export const getFactory = cache((customDictionary: ComponentTypeDictionary = []) => {
	const factory = getBaseFactory();

	const dictionary = [...CmsDictionary, ...WidgetDictionary, ...customDictionary];

	factory.registerAll(dictionary);

	return factory;
});
