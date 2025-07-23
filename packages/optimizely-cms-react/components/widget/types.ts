import { IWidget } from "@/gql/graphql";
import { ComponentFactory } from "@packages/optimizely-cms-react";

export interface WidgetProps extends IWidget {
	__typename?: string;
	Variant?: string;
	Section?: string;
	CategoryId?: string;
	Info?: Record<string, any>;
	Settings?: Record<string, any>;
}

export interface RenderWidgetProps {
	factory: ComponentFactory;
	widget: WidgetProps;
	allWidgets: WidgetProps[];
	renderedWidgets?: Set<string>;
	categoryId?: string;
	info?: Record<string, any>;
	settings?: Record<string, any>;
}

export enum Zone {
	Default = "default",
}
