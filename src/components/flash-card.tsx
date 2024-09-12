'use client';

/**
 * Based on code generated by v0 by Vercel.
 * @see https://v0.dev/t/ZC7pC1Z22PN
 */
import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import ReactCardFlip from 'react-card-flip';
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"


export function FlashCard({QandAs, topic, moduleTitle}: {QandAs: any, topic: string, moduleTitle: string}) {

  const QAs = QandAs[topic]
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentQA, setCurrentQA] = useState(0)

  function flipCard() {
    setIsFlipped(!isFlipped)
  }

  function flipToShowQuestion() {
    setIsFlipped(false)
  }

  function nextCard() {
    const index = currentQA
    const nextIndex = (index + 1) % QAs.length
    setCurrentQA(nextIndex)
    flipToShowQuestion()
  }

  function previousCard() {
    const index = currentQA
    const previousIndex = (index - 1 + QAs.length) % QAs.length
    setCurrentQA(previousIndex)
    flipToShowQuestion()
  }

  // Sample Link: https://learn.microsoft.com/training/modules/ingest-data-with-spark-fabric-notebooks/
  function createLearnLink(unit: string) {
    return "https://learn.microsoft.com/training/modules/" + topic + "/" + unit + "?WT.mc_id=data-111905-alvidela";
  }

  return (
    <div id="flashcard" className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-96 bg-[#9ee0cb] rounded-xl shadow-md overflow-hidden m-4">
        <h1 className="text-lg m-5">{moduleTitle}</h1>
        <ReactCardFlip isFlipped={isFlipped}>
          <div className="react-card-front bg-[#c0ecdd]">
            <div className="p-8">
              <CardHeader>
                <CardTitle className="text-[#8B4513]">Question</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-[#A0522D] h-44 overflow-auto">{QAs[currentQA].Q}</CardContent>
              <Button className="mt-4 text-[#CD853F] border-[#CD853F]" variant="outline" onClick={flipCard}>
                Show Answer
              </Button>
            </div>
          </div>
          <div className="react-card-back bg-[#c0ecdd]">
            <div className="p-8">
              <CardHeader>
                <CardTitle className="text-[#8B4513]">Answer</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-[#A0522D] h-44 overflow-auto">{QAs[currentQA].A}
                <br /><br />
                <Link
                  className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                  href={createLearnLink(QAs[currentQA].source)}
                  rel="noopener noreferrer"
                  target="_blank"
                >source</Link>
              </CardContent>
              <Button className="mt-4 text-[#CD853F] border-[#CD853F]" variant="outline" onClick={flipCard}>
                Hide Answer
              </Button>
            </div>
          </div>
        </ReactCardFlip>
        <CardFooter className="flex justify-between p-4 bg-[#9ee0cb]">
          <Button className="bg-[#117865] text-white border-[#8B4513]" onClick={previousCard}>
            Previous
          </Button>
          <Button className="bg-[#117865] text-white" onClick={nextCard}>Next</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
