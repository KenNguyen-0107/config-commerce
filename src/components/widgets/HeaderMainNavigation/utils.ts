import { ISubLinks } from ".";

export const groupItemsByLevel = (items: ISubLinks[]) => {
	const groupedItems: ISubLinks[] = [];

	// const lvl2Items = items.filter((item) => item.Level === 2);
	// lvl2Items?.forEach((item) => {
	// 	groupedItems.push({ ...item, children: [] });
	// });

	// const lvl3Items = items.filter((item) => item.Level === 3);
	// const parentItem = groupedItems[groupedItems.length - 1];
	// if (!parentItem?.children) return;
	// lvl3Items?.forEach((item) => {
	// 	parentItem.children?.push(item)
	// })

	items.forEach((item) => {
		if (item.Level === 2) {
			groupedItems.push({ ...item, children: [] });
		} else if (item.Level === 3) {
			const parentItem = groupedItems[groupedItems.length - 1];
			if (parentItem && parentItem.children) {
				parentItem.children.push(item);
			}
		}
	});

	return groupedItems;
};
