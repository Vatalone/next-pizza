'use client';

import React, { useEffect, useRef } from 'react'
import {useIntersection} from 'react-use';
import { Title } from './title';
import { ProductCard } from './product-card';
import { useCategoryStore } from '@/shared/store/category';
import { cn } from '@/shared/lib/utils';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
	title: string;
	catedoryId: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	items: ProductWithRelations[];
	listClassName?: string;
	classname?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
	title,
	catedoryId,
	items,
	listClassName,
	classname,
}) => {

	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

	const intersectionRef = useRef(null);

	const intersection = useIntersection(intersectionRef, {
		threshold: 0.4,
	})

	useEffect(() => {
		if(intersection?.isIntersecting){
			setActiveCategoryId(catedoryId);
		}
	}, [catedoryId, intersection?.isIntersecting, title])

	return (
		<div className={classname} id={title} ref={intersectionRef}>

			<Title text={title} size="lg" className="font-extrabold mb-5" />

			<div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
				{items.map((item, ind) => (
					<ProductCard
						id={item.id}
						key={ind}
						name={item.name}
						price={item.items[0].price}
						imageUrl={item.imageUrl}
						ingredients={item.ingredients}
					/>
				))}
			</div>

		</div>
	)
}