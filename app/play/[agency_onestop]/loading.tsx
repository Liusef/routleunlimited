import {LocateFixed} from "lucide-react";


export default function Loading() {
    // center a spinner (lucide + tailwind animate) in the middle of the screen with a message underneath
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="animate-spin">
                <LocateFixed size={24} />
            </div>
            <p className="text-xl text-white mt-4">Loading...</p>
        </div>
    );

}
