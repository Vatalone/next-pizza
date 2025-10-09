'use client';

import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store/category";
import { Category } from "@prisma/client";

interface Props {
	items: Category[];
	classname?: string;
}

export const Categories: React.FC<Props> = ({classname, items}) => {

	const categoryActiveId = useCategoryStore((state) => state.activeId)

	return (
		<div className={cn('inline-flex bg-gray-50 gap-1 p-1 rounded-2xl', classname)}>
			{
				items.map((cat, index) => (
					<a className={cn(
						'flex items-center font-bold h-11 rounded-2xl px-5',
						categoryActiveId === cat.id && 'bg-white shadow-md shadow-gray-200 text-primary')} key={index} href={`/#${cat.name}`}>
						<button>
							{cat.name}
						</button>
					</a>
				))
			}
		</div>
	)
}