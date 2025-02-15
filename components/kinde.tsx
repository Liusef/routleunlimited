'use client'
import { LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient, KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";
import {usePathname} from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ChevronRightIcon, CircleX, Loader2} from "lucide-react";
import {useEffect, useState} from "react";
import Link from "next/link";

//////////////

// set the org code, null if not set
const orgCode = 'org_c7b8d71661610'



//////////////

/**
 * AuthProvider is a wrapper component that provides the KindeProvider
 * @param {any} children
 * @returns {Element}
 * @constructor
 */
export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    return <KindeProvider>{children}</KindeProvider>;
};

/**
 * SignInButton is a button uses the LoginLink component to redirect to the login page
 * @returns {Element}
 * @constructor
 */
export function SignInButton() {
    const pathname = usePathname()

    return (
        <LoginLink postLoginRedirectURL={pathname} orgCode={orgCode}>
            <Button color={"primary"}>
                Sign In
            </Button>
        </LoginLink>)
}

/**
 * SignOutButton is a button uses the LogoutLink component to redirect to the logout page
 * @returns {Element}
 * @constructor
 */
export function SignOutButton() {
    return (<LogoutLink className={'w-full'}>
        <Button color={"danger"} className={'w-full'} >
            Logout
        </Button>
    </LogoutLink>)
}

/**
 * Greeting is a component that displays a greeting message to the user, using the useKindeBrowserClient hook
 * @returns {Element}
 * @constructor
 */
export function Greeting() {
    const {
        isLoading,
        user,
        isAuthenticated
    } = useKindeBrowserClient();

    if (isLoading) {
        return (
            <Skeleton className="h-3 w-3/5 rounded-lg"/>
        )
    }

    if (!isAuthenticated) {
        return (
            <p className={'text-lg font-semibold'}>Hello, Guest</p>
        )
    }

    return (
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Hello, {user?.given_name}!</h1>
    )
}

/**
 * Profile is a component that displays the user's profile picture and name, using the useKindeBrowserClient hook, and provides a dropdown menu with options to view settings, support, and logout
 * @returns {Element}
 * @constructor
 */
export function Profile() {
    const {
        isLoading,
        user,
        isAuthenticated
    } = useKindeBrowserClient();


    if (isLoading) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full"
                    >
                        <Avatar>
                            <Skeleton className={"flex rounded-full w-12 h-12"}/>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
            </DropdownMenu>
        )
    }

    if (!isAuthenticated) {
        return <SignInButton/>
    }

    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
                variant="ghost"
                size="icon"
                className="overflow-hidden rounded-full"
            >
                <ProfilePic />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user?.given_name} {user?.family_name}</DropdownMenuLabel>
            <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={'/settings'}>
            <DropdownMenuItem>

                    Settings

            </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <LogoutLink>
                <DropdownMenuItem>
                    Logout
                </DropdownMenuItem>
            </LogoutLink>

        </DropdownMenuContent>
    </DropdownMenu>
    )
}

/**
 * ProfilePic is a component that displays the user's profile picture, using the useKindeBrowserClient hook
 * @returns {Element | null}
 * @constructor
 */
export function ProfilePic() {
    const {
        isLoading,
        user,
        isAuthenticated
    } = useKindeBrowserClient();

    if (isLoading && !user) {
        return (
            <div>
                <Skeleton className="flex rounded-full w-12 h-12"/>
            </div>
        )
    }

    if (!isAuthenticated) {
        return null
    }

    return <Avatar>
        <AvatarImage src={user?.picture ? user?.picture : undefined} alt={user?.email ? user?.email : undefined} />
        <AvatarFallback>{String(user?.given_name).charAt(0)}{String(user?.family_name).charAt(0)}</AvatarFallback>
    </Avatar>
}


export function KindeLogin({children}: {children: React.ReactNode}) {
    const pathname = usePathname()
    return <LoginLink postLoginRedirectURL={pathname} orgCode={orgCode}>
        {children}
    </LoginLink>
}



/**
 * CTALogin (Call To Action) is a component that displays a button that redirects to the login page, using the LoginLink component
 * @param {string} btnText
 * @param {Element} arrow
 * @returns {Element}
 * @constructor
 */
export function CTALogin({ btnText = `Continue`, arrow = <ChevronRightIcon className="ml-2 h-4 w-4" />}) {

    const [pressed, setPressed] = useState(false)
    const [offline, setOffline] = useState(false)


    useEffect(() => {
        setOffline(!window.navigator.onLine)
        console.log(offline)
    }, [offline]);


    if (offline) {
        return (
            <Button disabled variant={'ghost'}>
                <CircleX className="mr-2 h-4 w-4" />
                You are offline
            </Button>
        )

    }



    return (
        <LoginLink postLoginRedirectURL={'/manage'}  authUrlParams={{
            connection_id: "conn_018f08764fadbe40f7bd58abc7492a78"
        }} >

            {pressed && (
                <Button disabled variant={'ghost'}>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button>
            )}

            {!pressed && (
                <Button
                    variant={"ghost"}
                    onClick={() => setPressed(true)}
                >
                    {btnText}
                    {arrow}

                </Button>)
            }


        </LoginLink>
    )
}
