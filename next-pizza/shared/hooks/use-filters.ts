import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useState } from "react";
import React from "react";

interface PriceProps {
	priceFrom?: number;
	priceTo?: number;
}

interface QueryFilters extends PriceProps {
	ingredients: string;
	sizes: string;
	pizzaTypes: string;
}

export interface Filters {
	sizes: Set<string>,
	pizzaTypes: Set<string>,
	selectedIngredients: Set<string>,
	prices: PriceProps,
}

interface ReturnProps extends Filters {
	setPrices: (name: keyof PriceProps, value: number) => void;
	setPizzaTypes: (key: string) => void;
	setSizes: (key: string) => void;
	setSelectedIngredients: (key: string) => void;
}

export const useFilters = (): ReturnProps => {
	
	const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
	
	/* Фильтр ингредиетов */
	const [selectedIngredients, {toggle: toggleIngredients}] = useSet(new Set<string>(searchParams.get('ingredients')?.split(',')))

	/* Фильтр размеров */
	const [sizes, {toggle: toggleSizes}] = useSet(new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []))

	/* Фильтр типов */
	const [pizzaTypes, {toggle: togglePizzaTypes}] = useSet(new Set<string>(searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []))

	/* Фильтр стоимости */
	const [prices, setPrices] = useState<PriceProps>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
	})

	const updatePrice = (name: keyof PriceProps, value: number) => {
		setPrices(prev => ({
			...prev,
			[name]: value,
		}))
	}

	return React.useMemo(
    () => ({
      sizes,
      pizzaTypes,
      selectedIngredients,
      prices,
      setPrices: updatePrice,
      setPizzaTypes: togglePizzaTypes,
      setSizes: toggleSizes,
      setSelectedIngredients: toggleIngredients,
    }),
    [sizes, pizzaTypes, selectedIngredients, prices],
  );
}