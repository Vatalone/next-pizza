'use client';

import Image from "next/image";
import { Container } from "./container";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { cn } from "@/shared/lib/utils";
import { CartButton } from "./cart-button";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modals/auth-modal";
import { boolean } from "zod";


interface Props {
	classname?: string;
	hasSearch?: boolean
	hasCart?:boolean;
}

export const Header: React.FC<Props> = ({classname, hasSearch=true, hasCart=true}) => {
	const router = useRouter();

	const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);

	const searchParams = useSearchParams();
	React.useEffect(() => {
		if(searchParams.has('paid')){
			setTimeout(() => {
				router.replace('/')
				toast.success('Заказ оплачен!');
			}, 1000)
		}
		if(searchParams.has('verified')){
			setTimeout(() => {
				router.replace('/')
				toast.success('Пользователь подтвержден!');
			}, 1000)
		}
	}, [])
	return (
		<header className={cn('border-b', classname)}>
			<Container className="flex items-center justify-between py-8">

				{/* Левая часть */}
				<Link href={'/'}>
					<div className="flex items-center gap-4">
						<Image width={35} height={35} alt="" src='/logo.png'/>
						<div className="">
							<h1 className="text-2xl uppercase font-black">Next Pizza</h1>
							<p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
						</div>
					</div>
				</Link>

				{hasSearch && <div className="mx-10 flex-1 ">
					<SearchInput />
				</div>}

				{/* Правая часть */}
				<div className="flex items-center gap-3">
					<AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

					<ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

					{hasCart && <CartButton />}
				</div>

			</Container>
		</header>
	)
}