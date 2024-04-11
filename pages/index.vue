<script lang="ts" setup>

</script>

<template>
  <div class="-full max-w-4xl mx-auto">
    <PassphraseGenerator
      class="w-full mt-[10vh]"
    />

    <section class="flex flex-col gap-8 mt-40 pb-14">
      <Card>
        <CardHeader>
          <CardTitle>Why use a passphrase?</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Because humans are terrible at creating secure passwords. This <NuxtLink class="underline" href="https://xkcd.com/936/" external target="_blank">
              famous xkcd comic{{ }}
            </NuxtLink> got it right - humans have been trained to use passwords that are hard to remember, but easy for computers to guess.
          </p>

          <NuxtImg src="https://imgs.xkcd.com/comics/password_strength.png" class="mx-auto mt-8" width="600" />

          <p class="mt-6">
            On the other hand, passphrases are easy to remember, but very difficult to crack. Let's say you use an EFF Long List to generate a 6 word passphrase. Even assuming the attacker knows the exact wordlist and number of words you used, there's still 7776^6 possible combinations for the attacker to try out. That's 221073919720733357899776 possible combinations. Even if the attacker could try 1 trillion combinations per second, it would take him them millions of years to try all the possible combinations. That's what makes passphrases so secure and powerful.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Is it safe?</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            It depends. Are you the target of a nation-state level adversary? If so, you should probably not use this and should instead use Diceware to roll real physical dice and look up the words from the wordlist manually. This is the official recommendation of the original <NuxtLink to="https://theworld.com/~reinhold/dicewarefaq.html#electronic" external target="_blank" class="underline">
              Diceware FAQ{{ }}
            </NuxtLink>. As a regular person, even if you have high security needs like protecting long term cryptographic keys, you should be safe using this tool. Using real precision dice is the most secure way, but relying on the random number generator should be safe as well.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Is it actually random?</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            JavaScript <NuxtLink to="https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues" external target="_blank">
              <code class="bg-muted">window.crypto.getRandomValues()</code>
            </NuxtLink> <BaseTooltip content="cryptographically secure pseudorandom number generator">
              <abbr class="underline decoration-dotted">CSPRNG</abbr>
            </BaseTooltip> that ships with modern browsers to get random bytes is used. Many cryptographic library authors are now targeting the browser environment and most are using this API as their primary source of entropy, so you are in good company.
          </p>

          <p class="mt-2">
            To ensure Web Crypto API compatibility across Node.js, Browsers and other runtimes, <NuxtLink href="https://unjs.io/packages/uncrypto" external target="_blank">
              <code class="bg-muted">unjs/uncrypto</code>
            </NuxtLink> is used.
          </p>

          <p class="mt-2 mb-2">
            Implementation by <NuxtLink to="https://www.reddit.com/r/crypto/comments/4xe21s/comment/d6fduhd/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button" external target="_blank" class="underline">
              @Sc00bz on r/crypto.
            </NuxtLink>
          </p>
          <code>
            <pre class="bg-muted p-2 rounded-sm">
import { getRandomValues } from 'uncrypto'

function secureRandom(count: number) {
  const rand = new Uint32Array(1)
  const skip = 0x7FFFFFFF - 0x7FFFFFFF % count
  let result

  if (((count - 1) & count) === 0) {
    getRandomValues(rand)
    return rand[0] & (count - 1)
  }
  do {
    getRandomValues(rand)
    result = rand[0] & 0x7FFFFFFF
  } while (result >= skip)
  return result % count
}</pre>
          </code>
          <NuxtLink class="block text-right mt-1 mr-1 ml-auto text-muted-foreground text-sm hover:underline" to="https://github.com/matijaoe/wordware/blob/main/utils/random.ts" external target="_blank">
            source
          </NuxtLink>
        </CardContent>
      </Card>
    </section>

    <footer class="py-8">
      <div class="text-center text-sm text-muted-foreground">
        by <NuxtLink href="https://matijao.com" external target="_blank" class="hover:underline">
          Matija{{ }}
        </NuxtLink> on <NuxtLink href="https://github.com/matijaoe/wordware" external target="_blank" class="hover:underline">
          GitHub
        </NuxtLink>
      </div>
    </footer>
  </div>
</template>
