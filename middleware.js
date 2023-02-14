import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
	// const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	const session = await getToken({ req });
	if (!session) {
		return NextResponse.redirect(new URL("/signin", req.url));
	}
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/welcome/:path",
		"/reminders/:path",
		"/yoga/:path",
		"/meditate/:path",
		"/home/:path",
		"/music/:path",
		"/profile/:path",
	],
};
