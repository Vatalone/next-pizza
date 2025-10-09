import { Ingredient, ProductItem } from "@prisma/client";
import { calcTotalPizzaPrice } from ".";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";

interface ReturnProps {
	textDetails: string;
	totalPrice: number;
}

export const getPizzaDetails = (size: PizzaSize, type: PizzaType, items: ProductItem[], ingredients: Ingredient[], selectedIngredients: Set<number>): ReturnProps => {
	
	const textDetails = `${size} см, ${mapPizzaType[type]} тесто, ингредиенты: (${selectedIngredients.size})`;
	const totalPrice = calcTotalPizzaPrice(items, ingredients, size, type, selectedIngredients)

	return {
		textDetails,
		totalPrice,
	}
}