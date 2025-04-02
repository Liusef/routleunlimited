'use client'
import { Route} from "@/lib/types/transitland";
import dynamic from "next/dynamic";
import { centerOfMass } from "@turf/center-of-mass";
import {Suspense, useEffect, useState} from "react";
import {cleanCoords} from "@turf/clean-coords";
import {GeoJSON} from "react-leaflet";
import { bbox } from "@turf/bbox";
import { combine } from "@turf/combine";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";
import {beutifyAgencyName, cn} from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Coffee, RefreshCcw, Share} from "lucide-react";
import {usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Instructions from "@/components/instructions";

const Map = dynamic(() => import('@/components/maps/gamemap'), {
    ssr: false
})

/**
 *
 * @param {any} currentRoute
 * @param {any} routes
 * @returns {Element}
 * @constructor
 */




export default function Game({currentRoute, routes }: {currentRoute: Route, routes: Route[]}) {
    const [guesses, setGuesses] = useState([])
    const [fin, setFin] = useState(false)
    const [modal, setModal] = useState(false)
    const [won, setWon] = useState(false)
    const centerOfRoute = centerOfMass(currentRoute.geometry)
    const routegeojson = cleanCoords(currentRoute.geometry)
    const [boundbox, setBoundbox] = useState(bbox(routegeojson))

    const [practiceMode, setPracticeMode] = useState(false)

    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (pathname.includes('practice')) {
            setPracticeMode(true)
        }
    }, []);

    useEffect(() => {
        // using 'combine' from turf, we can combine the features of the route and the guesses, then get the bounds of that
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const combined = combine([routegeojson, ...guesses.map(guess => cleanCoords(routes.find(route => route.onestop_id === guess).geometry))])
        setBoundbox(bbox(combined))
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        if (guesses.length === 5 || guesses.includes(currentRoute.onestop_id)) {
            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            if (guesses.includes(currentRoute.onestop_id)) {
                setWon(true)
            }
            setFin(true)
            setModal(true)
        }

    }, [guesses]);



    // create a ui of 75% of the vertical screen + 25% of the vertical screen
    // the top 75% will be the map
    // the bottom 25% will be the guesses





    return (
        <div className={'bg-zinc-900 w-screen h-screen'}>
            <div className={'w-full h-3/5'}>
                <Suspense>
                <Instructions />

                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-expect-error */}

                <Map bounds={boundbox}
                    lat={centerOfRoute.geometry.coordinates[1]}
                    lng={centerOfRoute.geometry.coordinates[0]}
                    showTiles={fin}

                >
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-expect-error */}
                    <GeoJSON data={routegeojson} onEachFeature={(feature, layer) => {
                                 layer.setStyle({color: 'white'})
                             }}
                    />

                    {guesses.map((guess, index) => {
                        const guessRoute = routes.find(route => route.onestop_id === guess)

                        //console.log(index, guess)

                        if (!guessRoute?.geometry) {
                            return null
                        }

                        // make the color of the geojson red, as its a guess
                        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        return (<GeoJSON key={index} data={cleanCoords(guessRoute.geometry)} onEachFeature={(feature, layer) => {
                                layer.setStyle(
                                    {
                                        color: guessRoute.onestop_id === currentRoute.onestop_id ? 'hsl(120, 100%, 50%)' : 'hsl(0, 100%, 50%)',
                                    })
                            }}
                            />
                        )
                    })}

                    {!fin && guesses.map((guess, index) => {
                        const guessRoute = routes.find(route => route.onestop_id === guess)

                        //console.log(index, guess)

                        if (!guessRoute?.geometry) {
                            return null
                        }

                        // make the color of the geojson red, as its a guess
                        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        return (<GeoJSON key={index} data={cleanCoords(guessRoute.geometry)} onEachFeature={(feature, layer) => {
                                layer.setStyle(
                                    {
                                        color: 'hsl(0, 0%, 30%)',
                                    })
                            }}
                            />
                        )
                    })}

                </Map>
                </Suspense>
            </div>
            {/* Guesses and Route Options Section */}
            <div className={'w-full h-2/5 absolute bg-zinc-900 z-20 bottom-0 border-t border-white'}>
                {/* Guesses Display */}
                <div className={'w-full h-1/4 flex justify-center items-center gap-2'}>
                    {[...Array(5)].map((_, index) => {
                        const guess = guesses[index];
                        return (
                            <Button
                                key={index}
                                disabled
                                size={'icon'}
                                className={cn('w-1/5 h-full', {
                                    'bg-red-500': guess && routes.find(route => route.onestop_id === guess)?.onestop_id !== currentRoute.onestop_id,
                                    'bg-green-500': guess && routes.find(route => route.onestop_id === guess)?.onestop_id === currentRoute.onestop_id,
                                })}
                            >
                                {guess && (
                                    <div className="w-full h-full flex justify-center items-center">
                                        <p>{routes.find(route => route.onestop_id === guess)?.route_short_name}</p>
                                    </div>
                                )}
                            </Button>
                        );
                    })}
                </div>

                {/* Scrollable Route List */}
                {!fin && (
                    <ScrollArea className="w-full h-4/5">
                        <div className="grid grid-cols-4 gap-4 p-4 overflow-y-auto">
                            {routes.map((route, index ) => {
                                //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                //@ts-expect-error
                                if (guesses.includes(route.onestop_id)) {
                                    return null;
                                }

                                //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                //@ts-expect-error
                                return (<Button key={`${route.onestop_id}-${index}`} variant={guesses.includes(route.onestop_id)
                                        ? route.onestop_id === currentRoute.onestop_id
                                            ? 'secondary'
                                            : 'destructive'
                                        : 'default'
                                    }
                                                onClick={() => {
                                                    if (route.onestop_id === currentRoute.onestop_id) {
                                                        setFin(true);
                                                    }
                                                    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                    //@ts-expect-error
                                                    setGuesses([...guesses, route.onestop_id]);
                                                }}
                                                disabled={fin}
                                    >
                                        {route.route_short_name}
                                    </Button>
                                );
                            })}
                        </div>
                    </ScrollArea>
                )}
                {fin && (
                    <div className="w-full h-4/5 flex justify-center items-center">
                        <Button
                            onClick={() => {
                                setModal(true)
                            }}
                            className={'w-1/2 bg-primary text-primary-foreground'}
                        >
                            Finish
                        </Button>
                    </div>
                )}



            </div>
            <Dialog open={modal}>
                <DialogContent>
                    <DialogHeader>
                        {won && (
                            <>
                                <DialogTitle className={'text-white'}>
                                    You did it!
                                </DialogTitle>
                                <DialogDescription>
                                    You guessed the route correctly!
                                </DialogDescription>
                            </>
                        )}
                        {!won && (
                            <>
                                <DialogTitle className={'text-white'}>
                                    So close! The correct route was <b className={'font-extrabold'}>{currentRoute.route_short_name}</b>
                                </DialogTitle>
                                <DialogDescription>
                                    You didn&apos;t guess the route correctly.
                                </DialogDescription>


                            </>)
                        }
                    </DialogHeader>

                    <DialogFooter className={'gap-2'}>

                        {!practiceMode && (
                            <Button
                                onClick={() => {

                                    /*
                                    [agency]] Routle mo/day/year
                                     🟩 ⬛ ⬛ ⬛ ⬛
                                     */

                                    /**
                                     * emojis work like this:
                                     *  🟩 = correct
                                     *  🟥 = incorrect
                                     *  ⬛ = not guessed (usually if the person guesses the route in under 5 guesses, we use this to fill in the rest of the guesses)
                                     *  the guesses array may not be 5 long, so we need to fill in the rest of the guesses with ⬛ if the user guesses the route in under 5 guesses
                                     *
                                     * examples:
                                     *
                                     *  🟥 🟥 🟥 🟥🟩
                                     *  🟩⬛⬛⬛⬛
                                     *  🟥🟥🟩⬛⬛
                                     */

                                    let emojiString = ''
                                    guesses.forEach((guess) => {
                                        if (guess === currentRoute.onestop_id) {
                                            emojiString += '🟩'
                                        } else {
                                            emojiString += '🟥'
                                        }
                                    })
                                    for (let i = guesses.length; i < 5; i++) {
                                        emojiString += '⬛'
                                    }
                                    const text = `${beutifyAgencyName(currentRoute.agency.agency_name)} Routle ${new Date().toLocaleDateString()}\n${emojiString}\n\nhttps://routleunlimited.com/play/${currentRoute.agency.onestop_id}`
                                    try {
                                        navigator.share({text: text})
                                    } catch (e: unknown) {

                                        console.error(e)
                                        // fallback to copying the link to the clipboard
                                        navigator.clipboard.writeText(text)

                                    }
                                }}
                                className={'w-full bg-primary text-primary-foreground'}
                                variant={'ghost'}
                            >
                                <Share className={'h-6 w-6'} />
                                Share your score

                            </Button>
                        )}
                        {practiceMode && (
                            <Button
                                onClick={() => {
                                    // force a page refresh
                                    router.push(`/play/${currentRoute.agency.onestop_id}/practice`)
                                }}
                                className={'w-full bg-primary text-primary-foreground'}
                                variant={'ghost'}
                            >
                                <RefreshCcw  className={'h-6 w-6'} />
                                Play Again

                            </Button>
                        )}

                        <Button
                            onClick={() => {
                                router.push(`/play`)
                            }}
                            className={'w-full bg-primary text-primary-foreground'}
                            variant={'ghost'}
                        >
                            <RefreshCcw  className={'h-6 w-6'} />
                            Play Another Agency

                        </Button>
                    </DialogFooter>

                    <div>
                        {/* small text to hide the modal */}
                        <Button variant={'link'} onClick={() => {
                            setModal(false)
                        }}

                                className={'w-full text-white'}

                        >
                            Show the map again
                        </Button>
                    </div>

                    <div className={'w-full text-white'}>
                        <div className={'text-center'}>
                            {'Like the game?'}
                        </div>
                        <Button asChild variant="outline" size="sm" className="w-full">
                            <Link
                                href="https://ko-fi.com/quacksire"
                                target="_blank"
                                rel="noopener"
                                className="flex items-center space-x-2"
                            >
                                <Coffee className="h-4 w-4" />
                                <span>Buy me a coffee</span>
                            </Link>
                        </Button>
                    </div>

                    <div className={'w-full text-white'}>
                        <div className={'text-center'}>
                            {'Need to practice?'}
                        </div>
                        <Button asChild variant="outline" size="sm" className="w-full">
                            <Link
                                href={`/play/${currentRoute.agency.onestop_id}/practice`}
                                className="flex items-center space-x-2"
                            >
                                <span>Practice!</span>
                            </Link>
                        </Button>
                    </div>


                </DialogContent>
            </Dialog>
        </div>
    )
}

// instructions for playing the game:
// 1. the user will be shown a map with a route on it
// 2. the user will have to guess the route
// 3. the user will have 5 guesses to guess the route
// 4. the user can click on a route to guess it
// 5. if the user guesses the route correctly, they will be shown a modal with a share button to share with friends

/**
 * make instructions for the users to see when they first start the game, in copytext
 *
 * here is an example of what the instructions could look like:
 *
 * Welcome to Routle Unlimited! Here are the instructions:
 */
