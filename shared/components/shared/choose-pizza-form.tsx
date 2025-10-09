'use client';

import { cn } from "@/shared/lib/utils";
import { Ingredient, ProductItem } from "@prisma/client";
import React from "react";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { IngredientItem} from "./ingredient-item";
import { getPizzaDetails } from "@/shared/lib";
import { usePizzaOptions } from "@/shared/hooks";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}) => {

  const {size, type, selectedIngredients, availablePizzaSizes, currentItemId , setSize, setType, addIngredient} = usePizzaOptions(items)

  const {textDetails, totalPrice} = getPizzaDetails(size, type, items, ingredients, selectedIngredients)

  const handleClickAdd = () => {
    if(currentItemId){
      onSubmit(currentItemId, Array.from(selectedIngredients))
    }
  }

	return (
		<div className={cn(className, 'flex flex-1')}>
			 <PizzaImage imageUrl={imageUrl} size={size} />

       <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-4 mt-5">
        <GroupVariants
          items={availablePizzaSizes}
          value={String(size)}
          onClick={value => setSize(Number(value) as PizzaSize)}
        />
        <GroupVariants
          items={pizzaTypes}
          value={String(type)}
          onClick={value => setType(Number(value) as PizzaType)}
        />
        </div>

        <div className="p-5 bg-gray-50 rounded-md h-[420px] overflow-auto scrollbar mt-5">
        <div className="grid grid-cols-3 gap-3">
          {ingredients.map((item, idx) => (
            <IngredientItem imageUrl={item.imageUrl} name={item.name} price={item.price} key={idx} onClick={() => addIngredient(item.id)} active={selectedIngredients.has(item.id)} />
          ))}
        </div>
        </div>

        <Button
          loading={loading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          onClick={handleClickAdd}>
          Добавить в корзину за {totalPrice} ₽
        </Button>
       </div>
		</div>
	)
}