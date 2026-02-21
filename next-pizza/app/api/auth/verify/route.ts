import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const code = req.nextUrl.searchParams.get('code');
		console.log(code, 'КОД!!!!!')

		if (!code) {
			return NextResponse.json({ error: 'Неверный код' }, { status: 400 });
		}

		const verificationCode = await prisma.verificationCode.findFirst({
			where:{
				code,
			}
		})

		if (!verificationCode) {
			return NextResponse.json({ error: 'Неверный код' }, { status: 400 });
		}

		await prisma.user.update({
			where:{
				id: verificationCode.userId,
			},
			data:{
				verified: new Date(),
			}
		})

		await prisma.verificationCode.delete({
			where:{
				id: verificationCode.id,
			}
		})
		console.log(req.url)
		return NextResponse.redirect(new URL('/?verified', req.url));
	} catch (error) {
		console.error(error);
    console.log('[VERIFY_GET] Server error', error);
	}
}