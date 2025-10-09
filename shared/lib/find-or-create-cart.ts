import { prisma } from '@/prisma/prisma-client';

export const findOrCreateCart = async (token: string) => {
	let userCart = await prisma.cart.findFirst({
		where: {
			token,
		},
	});

	console.log(userCart)

	if (!userCart) {
		userCart = await prisma.cart.create({
			data:{
				token: token,
			}
		});
	}
	console.log(userCart)
	return userCart;
};
