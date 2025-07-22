import { WidgetProps } from "@packages/optimizely-cms-react/components/widget/types";

export interface RenderWidgetProps {
	widget: WidgetProps;
	allWidgets: WidgetProps[];
	renderedWidgets?: Set<string>
}

export enum Zone {
	Default = "default",
}