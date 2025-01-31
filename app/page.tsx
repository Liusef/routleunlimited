import Link from "next/link"
import {Button} from "@/components/ui/button";

export default function Home() {

    /*
    <Link href="/leaderboards">
                    <Button
                       variant={'secondary'}
                       className={"w-64 mx-auto bg-secondary text-secondary-foreground font-bold py-3 px-6 rounded-lg"}
                    >
                    See Leaderboards
                    </Button>
                </Link>
     */

  return (
      <div className={'flex-grow flex items-center justify-center mt-[-16]'}>
        {/* Main Content */}
        <main className="">
          <div className="text-center p-8">
            <h1 className="text-6xl font-bold text-white mb-4">Routle Unlimited</h1>
            <p className="text-2xl text-zinc-400 mb-12">Test your knowledge of transit agencies</p>
            <div className="space-y-6 gap-3">
                <Link href="/play">
                    <Button
                        variant={'outline'}
                        size={'lg'}
                        className="w-64 mx-auto bg-primary text-primary-foreground font-bold py-3 px-6 rounded-lg"
                    >
                        Play Now
                    </Button>
                </Link>


            </div>
          </div>
        </main>

      </div>
  )
}

