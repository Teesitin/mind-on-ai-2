<script lang="ts">
    import Button from "$lib/components/common/Button.svelte";
    import RedirectButton from "$lib/components/common/RedirectButton.svelte";
    import HackerBackground from "$lib/components/HackerBackground.svelte";
    import { questions, randomizedQuestions, resetAnswers, setAnswer } from "$lib/userResponse";
    import { onMount } from "svelte";

    let resetClicks = 0;
    const resetClickAmount = 5;
    let resetTimeout: ReturnType<typeof setTimeout>; // ✅ works in browser too
    
    function handleResetClick() {
        resetClicks++;

        // reset counter if too slow
        clearTimeout(resetTimeout);
        resetTimeout = setTimeout(() => (resetClicks = 0), 3000);

        if (resetClicks >= resetClickAmount) {
            resetAnswers();
            resetClicks = 0;
        }
    }
</script>

<section class="z-10 max-w-3xl w-[90%] mt-10 m-auto text-center">
    <h1 class="text-3xl mb-8">
        AI Opinion Survey
    </h1>

    <p class="mb-10 leading-relaxed">
        Please answer each question honestly. Your responses help us understand how people truly feel about AI and its role in everyday life.
    </p>
</section>

{#each $randomizedQuestions as question}
    <section class="z-10 max-w-3xl w-[90%] mt-20 m-auto text-center rounded-xl backdrop-blur border p-4 border-blue-500/50">
        <p class="text-xl mb-8">
            {question.question}
        </p>

        <p class="flex gap-4 justify-center">
            <Button btnClass={`w-[100px] ${question.answer === "No" ? 'bg-sky-300/50' : ''}`} on:click={() => setAnswer(question.index, "No")}>
                No
            </Button>

            <Button btnClass={`w-[100px] ${question.answer  === "Yes" ? 'bg-sky-300/50' : ''}`} on:click={() => setAnswer(question.index, "Yes")}>
                Yes
            </Button>
        </p>
    </section>
{/each}

<section class="z-10 max-w-3xl w-[90%] my-20 m-auto text-center flex justify-center items-center gap-6">
    <Button btnClass="bg-red-500/30 hover:bg-red-500/50" on:click={handleResetClick}>
        {resetClicks > 0 ? `Click ${resetClickAmount - resetClicks} time${resetClickAmount - resetClicks === 1 ? '' : 's'}` : 'Reset'}
    </Button>

    <RedirectButton btnClass="w-64" link="/report">Submit</RedirectButton>
</section>