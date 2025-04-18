import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import CredentialsSignInForm from "./credentials-signin-form";
export const metadata: Metadata = { 
    title: 'Sign in'
}
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const SignInPage = async (props: {
    searchParams: Promise<{
        callbackUrl: string
    }>
}) => {
    // callback url where user will be redirected to after being forced to sign in mid session
    const { callbackUrl } = await props.searchParams

    // get current user session
    const session = await auth()

    // if user is logged in, redirect to callback url or homepage
    if(session){
        return redirect(callbackUrl || '/')
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <Card>
                <CardHeader className="space-y-4">
                    <Link href='/' className='flex-center'>
                        <Image src='/images/logo.svg' width={100} height={100} alt={`${APP_NAME} logo`} priority />
                    </Link>
                    <CardTitle className="text-center">Sign In</CardTitle>
                    <CardDescription className="text-center">
                        Sign in to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <CredentialsSignInForm />
                </CardContent>
            </Card>
        </div>
    )
}
 
export default SignInPage;