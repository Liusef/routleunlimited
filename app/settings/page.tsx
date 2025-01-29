"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs"
import { LocateFixed } from "lucide-react"

export default function Profile() {
    const router = useRouter()
    const {
        isLoading,
        user,
        isAuthenticated
    } = useKindeBrowserClient();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [profilePicture, setProfilePicture] = useState("/placeholder-avatar.png")

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/api/auth/login")
        }
        console.log(isLoading, isAuthenticated, user)
        if (user) {
            setFirstName(user.given_name || "")
            setLastName(user.family_name || "")
            setEmail(user.email || "")
            setProfilePicture(user.picture || "/placeholder-avatar.png")
        }

    }, [isLoading, isAuthenticated, user, router])

    const handleSave = async () => {
        // Here you would typically send a request to your backend to update the user's information
        console.log("Saving user information:", { firstName, lastName, email })
        // For now, we'll just show an alert
        alert("Profile updated successfully!")
    }

    const handleDelete = async () => {
        // Here you would typically send a request to your backend to delete the user's account
        console.log("Deleting user account")
        // For now, we'll just redirect to the home page
        await fetch("/api/auth/logout")
        router.push("/")
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfilePicture(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    if (isLoading) {
        return (<div className="flex flex-col items-center justify-center h-screen">
            <div className="animate-spin">
                <LocateFixed size={24} />
            </div>
            <p className="text-xl text-white mt-4">Loading...</p>
        </div>)
    }

    if (!isAuthenticated) {
        return null // This will prevent a flash of unauthenticated content
    }

    return (
        <div className="container mx-auto px-4 py-8 ">
            <Card className="max-w-2xl mx-auto bg-zinc-900 text-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-primary">User Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-center mb-6">
                        <div className="relative w-32 h-32">
                            <Image
                                src={profilePicture || "/placeholder.svg"}
                                alt="Profile Picture"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                            />
                            <Label
                                htmlFor="picture"
                                className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer"
                            >
                                Edit
                            </Label>
                            <Input id="picture" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input className={'bg-zinc-900'} id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input className={'bg-zinc-900'} id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input className={'bg-zinc-900'} id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">Delete Account</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account and remove your data from our
                                    servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>Yes, delete my account</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <Button onClick={handleSave}>Save Changes</Button>

                </CardFooter>
            </Card>
        </div>
    )
}

