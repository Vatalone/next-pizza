import React from "react"
import { CheckoutItem, CheckoutItemSkeleton, WhiteBlock } from ".."
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { getCartItemDetails } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";

interface Props {
	className?: string;
	items: CartStateItem[];
	removeCartItem: (id: number) => void;
	updateItemQuantity: (id: number, quantity: number) => void;
	loading?: boolean;
}

export const CheckoutCart: React.FC<Props> = ({className, items, removeCartItem, updateItemQuantity, loading}) => {

	const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

	return (
		<WhiteBlock className={className} title="1. Корзина">
			<div className="flex flex-col gap-5">
				{loading
				? [...Array(4).fill(0)].map((_, idx) => (
					<CheckoutItemSkeleton key={idx} />
				))
				:	items.map((item, idx) => (
					<CheckoutItem 
						key={idx}
						id={item.id}
						imageUrl={item.imageUrl}
						details={getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)}
						name={item.name}
						price={item.price}
						quantity={item.quantity}
						disabled={item.disabled}
						onClickCountButton={(type) =>
							onClickCountButton(item.id, item.quantity, type)
						}
						onClickRemove={() => removeCartItem(item.id)}
					/>
				))}
			</div>
		</WhiteBlock>
	)
}