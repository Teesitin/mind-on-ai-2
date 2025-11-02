<script lang="ts">
    import RedirectButton from "$lib/components/common/RedirectButton.svelte";
    import HackerBackground from "$lib/components/HackerBackground.svelte";
    import Gauge from "$lib/components/report/Gauge.svelte";
    import { questions } from "$lib/userResponse";

    // derived reactivity for completed check
    let allAnswered = $derived($questions.every(q => q.answer !== ""));

    let scores = $derived({
        acceptance: 0,
        safety: 0,
        humanlike: 0,
        savior: 0
    });

    $effect(() => {
        const result = {
            acceptance: 0,
            safety: 0,
            humanlike: 0,
            savior: 0
        };

        for (const q of $questions) {
            const val = q.answer === "Yes" ? 1 : q.answer === "No" ? -1 : 0;

            switch (q.type) {
                case "acceptance":
                    result.acceptance += val;
                    break;
                case "rejection":
                    result.acceptance -= val;
                    break;
                case "safety":
                    result.safety += val;
                    break;
                case "progress":
                    result.safety -= val;
                    break;
                case "humanlike":
                    result.humanlike += val;
                    break;
                case "robotic":
                    result.humanlike -= val;
                    break;
                case "savior":
                    result.savior += val;
                    break;
                case "extinction":
                    result.savior -= val;
                    break;
            }
        }

        for (const key in result) {
            result[key as keyof typeof result] = Math.max(-10, Math.min(10, result[key as keyof typeof result]));
        }

        scores = result;
    });

    // 🧠 Test helper: randomize all answers
    function randomizeAnswers() {
        console.log("test");
        questions.update(qs => {
            qs.forEach(q => {
                q.answer = Math.random() > 0.5 ? "Yes" : "No";
            });
            return qs;
        });
    }



    function phraseAcceptance(v: number) {
        if (v >= 6) return "You are very open to AI and embrace its role in everyday life.";
        if (v >= 1) return "You are generally open to AI and see its potential benefits.";
        if (v === 0) return "You feel neutral toward AI and use it without strong opinions.";
        if (v <= -1 && v >= -5) return "You're cautious about AI and prefer to keep some distance.";
        return "You're strongly opposed to AI and distrust its influence on society.";
    }

    function phraseSafety(v: number) {
        if (v >= 6) return "You believe AI should be carefully controlled and ethically regulated.";
        if (v >= 1) return "You support AI progress, but still value safety and accountability.";
        if (v === 0) return "You're balanced as you see both risk and opportunity in AI's progress.";
        if (v <= -1 && v >= -5) return "You lean toward progress and think innovation should move fast.";
        return "You believe AI progress should be unrestricted, even if it carries risks.";
    }

    function phraseHumanlike(v: number) {
        if (v >= 6) return "You prefer AI that feels more human, expressive, and emotionally aware.";
        if (v >= 1) return "You enjoy AI that shows a touch of personality or empathy.";
        if (v === 0) return "You don't mind either human-like or robotic, as long as it works.";
        if (v <= -1 && v >= -5) return "You prefer AI that's practical and straightforward rather than emotional.";
        return "You like AI to stay purely robotic and efficient, without human traits.";
    }

    function phraseSavior(v: number) {
        if (v >= 6) return "You see AI as a force for good and something that can truly improve humanity.";
        if (v >= 1) return "You think AI will mostly help people and make life easier overall.";
        if (v === 0) return "You're uncertain whether AI will save or harm us.";
        if (v <= -1 && v >= -5) return "You're wary that AI could cause more harm than good.";
        return "You believe AI is dangerous or even a threat to humanity's future.";
    }


    function buildSummary(scores: { acceptance: number; safety: number; humanlike: number; savior: number; }) {
        return [
            phraseAcceptance(scores.acceptance),
            phraseSafety(scores.safety),
            phraseHumanlike(scores.humanlike),
            phraseSavior(scores.savior)
        ].join(" ");
    }

</script>

<!-- Randomize button for testing -->
<!-- <button
    onclick={randomizeAnswers}
    class="fixed top-4 right-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg z-50"
>
    🎲 Randomize
</button> -->


{#if !allAnswered}
    <section class="mt-10 text-center max-w-3xl m-auto w-[90%]">
        <h1 class="text-3xl">Did you finish the survey?</h1>

        <p class="leading-relaxed text-lg text-gray-300 mt-8">
            If you're seeing this, it means you didn't finish the survey. Please go back and answer all the questions. Thank you!
        </p>

        <div class="flex items-center justify-center mt-8">
            <RedirectButton link="/survay">
                Take the Survey
            </RedirectButton>
        </div>
    </section>
{:else}
    <section class="mt-12 text-center max-w-3xl m-auto w-[90%]">
        <h1 class="text-2xl text-blue-300 mb-4">Quick Summary</h1>
        <p class="text-lg text-gray-200 leading-relaxed">
            {buildSummary(scores)}
        </p>
    </section>

    <section class="mt-10 text-center max-w-3xl m-auto w-[90%]">
        <div class="flex justify-center gap-40">
            <Gauge bind:value={scores.acceptance} topLabel="Acceptance" bottomLabel="Rejection" />
            <Gauge bind:value={scores.safety} topLabel="Safety" bottomLabel="Progress" />
            <Gauge bind:value={scores.humanlike} topLabel="Human" bottomLabel="Robotic" />
            <Gauge bind:value={scores.savior} topLabel="Savior" bottomLabel="Extinction" />    
        </div>
    </section>
{/if}

<!-- Personality Subtype Tables -->
<section class="mt-20 max-w-3xl m-auto space-y-20">
    <h2 class="text-2xl mb-4 text-blue-300 text-center">AI Attitude Breakdown</h2>

    <!-- Acceptance ↔ Rejection -->
    <table class="w-full border-collapse text-sm text-gray-300 backdrop-blur-xs outline-1 outline-blue-500/50 rounded-xl">
        <thead>
            <tr class="text-blue-300 border-b border-blue-500/50">
                <th colspan="3" class="p-3 text-left font-semibold">Acceptance ↔ Rejection</th>
            </tr>
        </thead>
        <tbody>
            <tr class="{scores.acceptance >= 6 ? 'bg-blue-900/40' : ''}">
                <td class="p-2 w-36">🟦 High Positive</td>
                <td class="p-2">AI Evangelist</td>
                <td class="p-2">Fully embraces AI as transformative and essential. Advocates for deeper integration of AI in life and work.</td>
            </tr>
            <tr class="{scores.acceptance >= 1 && scores.acceptance <= 5 ? 'bg-green-900/40' : ''}">
                <td class="p-2">🟩 Positive</td>
                <td class="p-2">Tech Optimist</td>
                <td class="p-2">Generally positive about AI's potential but still trusts human oversight.</td>
            </tr>
            <tr class="{scores.acceptance === 0 ? 'bg-slate-800/50' : ''}">
                <td class="p-2">⚪ Neutral</td>
                <td class="p-2">Indifferent</td>
                <td class="p-2">Feels neither for nor against AI. Uses it situationally but remains emotionally detached.</td>
            </tr>
            <tr class="{scores.acceptance <= -1 && scores.acceptance >= -5 ? 'bg-yellow-900/40' : ''}">
                <td class="p-2">🟨 Negative</td>
                <td class="p-2">Cautious Realist</td>
                <td class="p-2">Sees value in AI but keeps distance due to ethical or social concerns.</td>
            </tr>
            <tr class="{scores.acceptance <= -6 ? 'bg-red-900/40' : ''}">
                <td class="p-2">🟥 High Negative</td>
                <td class="p-2">AI Skeptic</td>
                <td class="p-2">Deeply distrustful of AI and its societal effects.</td>
            </tr>
        </tbody>
    </table>

    <!-- Safety ↔ Progress -->
    <table class="w-full border-collapse text-sm text-gray-300 backdrop-blur-xs outline-1 outline-blue-500/50 rounded-xl">
        <thead>
            <tr class="text-blue-300 border-b border-blue-500/50">
                <th colspan="3" class="p-3 text-left font-semibold">Safety ↔ Progress</th>
            </tr>
        </thead>
        <tbody>
            <tr class="{scores.safety >= 6 ? 'bg-blue-900/40' : ''}">
                <td class="p-2 w-36">🟦 High Positive</td>
                <td class="p-2">Ethicist</td>
                <td class="p-2">Prioritizes regulation and moral responsibility over rapid progress.</td>
            </tr>
            <tr class="{scores.safety >= 1 && scores.safety <= 5 ? 'bg-green-900/40' : ''}">
                <td class="p-2">🟩 Positive</td>
                <td class="p-2">Balancer</td>
                <td class="p-2">Supports innovation but insists on responsible development.</td>
            </tr>
            <tr class="{scores.safety === 0 ? 'bg-slate-800/50' : ''}">
                <td class="p-2">⚪ Neutral</td>
                <td class="p-2">Indifferent</td>
                <td class="p-2">Views AI progress with measured detachment. Accepts both risk and reward.</td>
            </tr>
            <tr class="{scores.safety <= -1 && scores.safety >= -5 ? 'bg-yellow-900/40' : ''}">
                <td class="p-2">🟨 Negative</td>
                <td class="p-2">Visionary</td>
                <td class="p-2">Believes risk is a necessary price for discovery and progress.</td>
            </tr>
            <tr class="{scores.safety <= -6 ? 'bg-red-900/40' : ''}">
                <td class="p-2">🟥 High Negative</td>
                <td class="p-2">Accelerationist</td>
                <td class="p-2">Wants unrestricted AI evolution. Let the future unfold freely.</td>
            </tr>
        </tbody>
    </table>

    <!-- Human-Like ↔ Robotic -->
    <table class="w-full border-collapse text-sm text-gray-300 backdrop-blur-xs outline-1 outline-blue-500/50 rounded-xl">
        <thead>
            <tr class="text-blue-300 border-b border-blue-500/50">
                <th colspan="3" class="p-3 text-left font-semibold">Human-Like ↔ Robotic</th>
            </tr>
        </thead>
        <tbody>
            <tr class="{scores.humanlike >= 6 ? 'bg-blue-900/40' : ''}">
                <td class="p-2 w-36">🟦 High Positive</td>
                <td class="p-2">Empathic Designer</td>
                <td class="p-2">Wants AI to feel alive and emotionally intelligent.</td>
            </tr>
            <tr class="{scores.humanlike >= 1 && scores.humanlike <= 5 ? 'bg-green-900/40' : ''}">
                <td class="p-2">🟩 Positive</td>
                <td class="p-2">Conversationalist</td>
                <td class="p-2">Prefers expressive but bounded personality in AI.</td>
            </tr>
            <tr class="{scores.humanlike === 0 ? 'bg-slate-800/50' : ''}">
                <td class="p-2">⚪ Neutral</td>
                <td class="p-2">Indifferent</td>
                <td class="p-2">No preference. Sees AI as tools regardless of emotional realism.</td>
            </tr>
            <tr class="{scores.humanlike <= -1 && scores.humanlike >= -5 ? 'bg-yellow-900/40' : ''}">
                <td class="p-2">🟨 Negative</td>
                <td class="p-2">Pragmatist</td>
                <td class="p-2">Prefers efficient, functional AI over personality.</td>
            </tr>
            <tr class="{scores.humanlike <= -6 ? 'bg-red-900/40' : ''}">
                <td class="p-2">🟥 High Negative</td>
                <td class="p-2">Mechanist</td>
                <td class="p-2">Believes AI should remain purely logical and machine-like.</td>
            </tr>
        </tbody>
    </table>

    <!-- Savior ↔ Extinction -->
    <table class="w-full border-collapse text-sm text-gray-300 backdrop-blur-xs outline-1 outline-blue-500/50 rounded-xl">
        <thead>
            <tr class="text-blue-300 border-b border-blue-500/50">
                <th colspan="3" class="p-3 text-left font-semibold">Savior ↔ Extinction</th>
            </tr>
        </thead>
        <tbody>
            <tr class="{scores.savior >= 6 ? 'bg-blue-900/40' : ''}">
                <td class="p-2 w-36">🟦 High Positive</td>
                <td class="p-2">Futurist</td>
                <td class="p-2">Believes AI will elevate humanity to its next age.</td>
            </tr>
            <tr class="{scores.savior >= 1 && scores.savior <= 5 ? 'bg-green-900/40' : ''}">
                <td class="p-2">🟩 Positive</td>
                <td class="p-2">Optimist</td>
                <td class="p-2">Trusts AI's benefits outweigh risks overall.</td>
            </tr>
            <tr class="{scores.savior === 0 ? 'bg-slate-800/50' : ''}">
                <td class="p-2">⚪ Neutral</td>
                <td class="p-2">Indifferent</td>
                <td class="p-2">Uncertain or detached. Neither expects salvation nor destruction from AI.</td>
            </tr>
            <tr class="{scores.savior <= -1 && scores.savior >= -5 ? 'bg-yellow-900/40' : ''}">
                <td class="p-2">🟨 Negative</td>
                <td class="p-2">Survivalist</td>
                <td class="p-2">Believes AI must be contained or guided to avoid harm.</td>
            </tr>
            <tr class="{scores.savior <= -6 ? 'bg-red-900/40' : ''}">
                <td class="p-2">🟥 High Negative</td>
                <td class="p-2">Doomer</td>
                <td class="p-2">Views AI as an existential threat to humanity.</td>
            </tr>
        </tbody>
    </table>
</section>

<div class="my-20 text-center">
    <RedirectButton link="/survay">
        Retake Survey
    </RedirectButton>
</div>