
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {useState, useEffect, useCallback} from "react"
import { Map, Route, MousePointer, Share2, Info } from "lucide-react"

export default function Instructions() {
    const [isOpen, setIsOpen] = useState(true)

    // use local storage to keep track of whether the user has seen the instructions
    // if they have, don't show them again
    useEffect(() => {
        if (localStorage.getItem("instructionsSeen") != "true") {
            setIsOpen(true)
        }
    }, [])

    const handleAcknowledgement = useCallback(() => {
        localStorage.setItem("instructionsSeen", "true")
        setIsOpen(false)
    }, [])

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="sm:max-w-[425px] text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl font-bold">How to Play:</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription className="space-y-4 text-white">
                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <Map className="mr-2 h-5 w-5 text-muted flex-shrink-0 mt-1" />
                            <span>A map with a mystery route will appear on your screen.</span>
                        </li>
                        <li className="flex items-start">
                            <Route className="mr-2 h-5 w-5 text-muted flex-shrink-0 mt-1" />
                            <span>Your goal is to guess which route it is. You can pan, zoom in/out of the map if you need more details</span>
                        </li>
                        <li className="flex items-start">
                            <MousePointer className="mr-2 h-5 w-5 text-muted flex-shrink-0 mt-1" />
                            <span>Click on any route in the list to make a guess. You have <b>5 chances</b>.</span>
                        </li>
                        <li className="flex items-start">
                            <Share2 className="mr-2 h-5 w-5 text-muted flex-shrink-0 mt-1" />
                            <span>If you guess correctly, you can share your result with friends.</span>
                        </li>
                    </ul>
                </AlertDialogDescription>
                <AlertDialogFooter className="mt-6">
                    <AlertDialogAction asChild>
                        <Button onClick={handleAcknowledgement} className="w-full text-white" variant={'link'}>
                            I got it!
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

