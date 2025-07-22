import { BasicRowProps } from '@/components/widgets/BasicRow/types';
import { cn } from '@/lib/utils';
import React from 'react';

const ImageList = (props: BasicRowProps) => {
	const  { children } = props

	return (
		<div className="bg-white border-y border-muted">
			<div className={cn(
				"container flex justify-between py-10 mx-auto",
				"[&>div:nth-child(2)]:justify-end",
				"flex-wrap lg:flex-nowrap"
			)}>
				{children}
			</div>
		</div>
	);
};

export default ImageList;