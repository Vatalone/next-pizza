
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
import { Api } from "../services/api-client";

export const useIngredients = () => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		async function fetchIngredients(){
			try {
				setLoading(true);
				const response = await Api.ingredients.getAll();
				setIngredients(response);
			} catch (error) {
				console.log(error)
			} finally{
				setLoading(false);
			}
		}

		fetchIngredients();
	}, [])

	return {
		ingredients,
		loading,
	}

}