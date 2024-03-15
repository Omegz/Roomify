'use client'
import { computed, effect, signal } from "@preact/signals-react";

const seed = signal(0)
effect(() => {
  seed.value = 0
  const interval = setInterval(() => {
    seed.value = Math.random()
  }, 3000)

  return () => {
    seed.value = 0
    return clearInterval(interval)
  } // cleanup
})

const words = [
  ['Tired', 'Need', 'Fucking', 'Chat'],
  ['of', 'less', 'Hate', 'smarter'],
  ['ChatGpt', 'Chaos', 'Not Harder']
]

const wordsDiv = computed(() => (
  words.map((word, i) => {
    return (
      <p key={i} className="animated-text mp md:sp">{word[Math.floor(((seed.value + (i / word.length)) / 2) * word.length)]}</p>
    )
  })
))

export function HomeWords() {
  seed.value = 0
  return (
    <div className="container">
      {wordsDiv}
    </div>
  );
}
