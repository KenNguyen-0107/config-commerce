import { ComponentFactory } from "@packages/optimizely-cms-react/factory";
import { RenderWidgetProps, WidgetProps, Zone } from "./types";
import { ReactNode } from "react";
import { Settings } from "lucide-react";

const RenderWidget = ({
	factory,
	widget,
	allWidgets,
	renderedWidgets = new Set(),
	categoryId,
	info,
	settings,
}: RenderWidgetProps) => {
	if (!widget?.Id || renderedWidgets.has(widget.Id)) {
		return null;
	}

	renderedWidgets.add(widget.Id);

	const Component = factory.resolve(widget?.__typename ?? "") as React.ComponentType<any>;

	if (!Component || typeof Component !== "function") {
		console.warn(`Invalid component type handle: ${widget.__typename}`);
		return null;
	}

	const childWidgets = allWidgets.filter(
		(w) => w.ParentId === widget.Id && w.Zone && !["Breadcrumb", "MainNavigation"].includes(w.Zone)
	);

	// Group child widgets by zone
	const widgetsByZone = childWidgets.reduce((acc, childWidget) => {
		const _zone = childWidget.Zone || "default";
		if (!acc[_zone]) {
			acc[_zone] = [];
		}

		acc[_zone].push(childWidget);

		return acc;
	}, {} as Record<string, WidgetProps[]>);

	// Combine all props
	const componentProps = { ...widget, CategoryId: categoryId, Info: info, Settings: settings };
	const envPrefix = process.env.GRAPH_ENV || "";
	const FooterComponentOrderMap = {
		Logo: "0",
		LinkList1: "1",
		LinkList2: "2",
		LinkList3: "3",
		LinkList4: "4",
		Subscribe: "5",
		SocialLinks: "6",
		SiteMapLinks: "7",
	} as const;

	return (
		<Component {...componentProps}>
			{Object.entries(widgetsByZone).map(([zone, widgets]) => (
				<ComponentWrapper
					key={zone}
					style={
						componentProps.__typename === `${envPrefix}FooterContainer`
							? {
									gridArea: zone,
									order: FooterComponentOrderMap[zone as keyof typeof FooterComponentOrderMap],
							  }
							: {}
					}
					className={
						componentProps.__typename === `${envPrefix}FooterContainer` && zone === "Subscribe"
							? "flex flex-col gap-6 py-8 lg:py-0"
							: ""
					}
					shouldRender={
						zone !== Zone.Default && componentProps.__typename === `${envPrefix}FooterContainer`
					}
				>
					{widgets.map((childWidget) => (
						<RenderWidget
							factory={factory}
							key={childWidget.Id}
							categoryId={categoryId}
							info={info}
							settings={settings}
							widget={{
								...childWidget,
								CategoryId: categoryId,
								Info: info,
								Settings: settings,
								Section:
									(childWidget.__typename === `${envPrefix}BasicRow` && childWidget.Variant) ||
									childWidget.Section ||
									componentProps.Section ||
									componentProps.Variant ||
									componentProps.__typename,
							}}
							allWidgets={allWidgets}
							renderedWidgets={renderedWidgets}
						/>
					))}
				</ComponentWrapper>
			))}
		</Component>
	);
};

const ComponentWrapper = ({
	shouldRender,
	style,
	children,
	className,
}: {
	shouldRender: boolean;
	style: React.CSSProperties;
	children: ReactNode;
	className?: string;
}) => {
	if (!shouldRender) {
		return children;
	}

	return (
		<div className={className} style={style}>
			{children}
		</div>
	);
};

const RenderAllWidgets = ({
	factory,
	widgets,
	categoryId,
	info,
	settings,
}: {
	factory: ComponentFactory;
	widgets: WidgetProps[];
	categoryId?: string;
	info?: Record<string, any>;
	settings?: Record<string, any>;
}) => {
	const renderedWidgets = new Set<string>();
	const rootWidgets = findRootWidgets(widgets);

	return (
		<>
			{rootWidgets.map((widget) => (
				<RenderWidget
					key={widget.Id}
					factory={factory}
					widget={widget}
					allWidgets={widgets}
					renderedWidgets={renderedWidgets}
					categoryId={categoryId}
					info={info}
					settings={settings}
				/>
			))}
		</>
	);
};

export default RenderAllWidgets;

const findRootWidgets = (widgets: WidgetProps[]): WidgetProps[] => {
	if (!widgets?.length) return [];

	const widgetIds = new Set(widgets.map((widget) => widget.Id));
	const rootWidgets = widgets.filter(
		(widget) => widget.ParentId && !widgetIds.has(widget.ParentId)
	);
	// console.log({ rootWidgets });
	return rootWidgets;
};
