<script lang="ts">
    import RedirectButton from "$lib/components/common/RedirectButton.svelte";
    import HackerBackground from "$lib/components/HackerBackground.svelte";
    import { questions } from "$lib/userResponse";

    // derived reactivity for completed check
    let allAnswered = $derived($questions.every(q => q.answer !== ""));

    // ✅ derive category scores properly
    let scores = $derived({
        acceptance: 10,
        safety: 10,
        humanlike: 10,
        savior: 10
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
            result[key as keyof typeof result] = Math.max(0, Math.min(20, 10 + result[key as keyof typeof result]));
        }

        scores = result;
    });
</script>

{#if !allAnswered}
    <section class="mt-10 text-center max-w-3xl m-auto w-[90%]">
        <h1 class="text-5xl">Did you finish the survey?</h1>

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
    <section class="mt-10 text-center max-w-3xl m-auto w-[90%]">
        <h1 class="text-5xl mb-10">Survey says...</h1>

        <div class="space-y-10">
            <div>
                <h2 class="text-2xl mb-2 text-blue-300">Acceptance ↔ Rejection</h2>
                <input type="range" min="0" max="20" step="1" value={scores.acceptance} class="w-full accent-blue-400" disabled />
                <p class="text-sm mt-1 text-gray-400">{scores.acceptance}/20</p>
            </div>

            <div>
                <h2 class="text-2xl mb-2 text-green-300">Safety ↔ Progress</h2>
                <input type="range" min="0" max="20" step="1" value={scores.safety} class="w-full accent-green-400" disabled />
                <p class="text-sm mt-1 text-gray-400">{scores.safety}/20</p>
            </div>

            <div>
                <h2 class="text-2xl mb-2 text-purple-300">Human-Like ↔ Robotic</h2>
                <input type="range" min="0" max="20" step="1" value={scores.humanlike} class="w-full accent-purple-400" disabled />
                <p class="text-sm mt-1 text-gray-400">{scores.humanlike}/20</p>
            </div>

            <div>
                <h2 class="text-2xl mb-2 text-red-300">Savior ↔ Extinction</h2>
                <input type="range" min="0" max="20" step="1" value={scores.savior} class="w-full accent-red-400" disabled />
                <p class="text-sm mt-1 text-gray-400">{scores.savior}/20</p>
            </div>
        </div>

        <div class="mt-12">
            <RedirectButton link="/survay">
                Retake Survey
            </RedirectButton>
        </div>
    </section>
{/if}
