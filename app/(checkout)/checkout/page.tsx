'use client';

import { useForm, FormProvider } from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod';

import { CheckoutSidebar, Container, Title} from "@/shared/components/shared";
import { useCart } from "@/shared/hooks";
import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm } from "@/shared/components/shared/checkout";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/constants/checkout-form-schema";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Checkout(){
	const {items, loading, removeCartItem, updateItemQuantity, totalAmount} = useCart();

	const [submitting, setSubmitting] = useState<boolean>(false);

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues:{
			email: '',
			firstName: '',
			lastName: '',
			phone:'',
			address:'',
			comment:''
		}
	});

	const onSubmit = async(data: CheckoutFormValues) => {
		try {
			setSubmitting(true);

			const url = await createOrder(data);

			toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
        icon: '✅',
      });

			if (url) {
        location.href = url;
      }
		} catch (error) {
			console.log(error);
      setSubmitting(false);
      toast.error('Не удалось создать заказ', {
        icon: '❌',
      });
		}
	}

	return (
		<Container className="mt-10">
			<Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex gap-10">
						{/* Левая часть */}
						<div className="flex flex-col gap-10 flex-1 mb-20">
							
							<CheckoutCart loading={loading} items={items} removeCartItem={removeCartItem} updateItemQuantity={updateItemQuantity} />

							<CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />

							<CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''}/>
						</div>

						{/* Правая часть */}
						<div className="w-[450px]">
							<CheckoutSidebar loading={loading || submitting} totalAmount={totalAmount} />
						</div>
					</div>
				</form>
			</FormProvider>
			
		</Container>
	)
}