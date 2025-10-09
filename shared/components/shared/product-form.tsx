'use client';

import React from "react";
import { ChoosePizzaForm, ChooseProductForm } from ".";
import { ProductWithRelations } from "@/@types/prisma";
import toast from "react-hot-toast";
import { useCart } from "@/shared/hooks";

interface Props{
	product: ProductWithRelations;
	onSubmit?: VoidFunction;
}

export const ProductForm:React.FC<Props> = ({product, onSubmit: _onSubmit}) => {
	const {addCartItem, loading} = useCart();

	const firstItem = product.items[0];
	const isPizzaForm = Boolean(firstItem.pizzaType); 


	const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
		try {
			const itemId = productItemId ?? firstItem.id

			await addCartItem({
				productItemId: itemId,
				ingredients
			})

			toast.success(product.name + ' добавлен(а) в корзину!');

			_onSubmit?.();
		} catch (error) {
			console.log(error);
			toast.error(`Не удалось добавить ${product.name} в корзину!`)
		}
	}
	if(isPizzaForm){
		return(
			<ChoosePizzaForm loading={loading} imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} items={product.items} onSubmit={onSubmit}/>
		)
	}
	return(
    <ChooseProductForm loading={loading} price={product.items[0].price} imageUrl={product.imageUrl} name={product.name} onSubmit={onSubmit}/>
	)
}