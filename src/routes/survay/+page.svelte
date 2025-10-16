<script lang="ts">
    import Button from "$lib/components/common/Button.svelte";
    import HackerBackground from "$lib/components/HackerBackground.svelte";

    const questions = [
        "I am comfortable sharing my personal data with AI systems.",
        "I believe AI will create more jobs than it replaces.",
        "I trust AI to make fair and unbiased decisions.",
        "I feel that AI is advancing too quickly for society to handle.",
        "I would be comfortable letting an AI assistant make important choices for me.",
        "I like my AI chatbot to have a personality, even if it acts flirty or funny.",
        "I think AI should have rights if it becomes self-aware.",
        "I believe AI can be trusted to care for people, such as the elderly or sick.",
        "I am worried that AI could eventually become dangerous to humanity.",
        "I think AI should always identify itself clearly as non-human in conversations."
    ];

    let answers = Array(questions.length).fill(null);

    function setAnswer(index: number, value: string) {
        // ✅ Replace the array reference so Svelte sees the change
        answers = answers.map((a, i) => (i === index ? value : a));

        console.log(answers);
    }
</script>

<HackerBackground />

<section class="z-10 max-w-3xl w-[90%] mt-20 m-auto text-center">
    <h1 class="text-3xl mb-8">
        AI Opinion Survey
    </h1>

    <p class="mb-10 leading-relaxed">
        Please answer each question honestly. Your responses help us understand how people truly feel about AI and its role in everyday life.
    </p>
</section>

{#each questions as question, i}
    <section class="z-10 max-w-3xl w-[90%] mt-20 m-auto text-center rounded-xl backdrop-blur border p-4 border-blue-500/50">
        <p class="text-xl mb-8">
            {question}
        </p>

        <p class="flex gap-4 justify-center">
            <Button btnClass={`w-[100px] ${answers[i] === "No" ? 'bg-sky-300/50' : ''}`} on:click={() => setAnswer(i, "No")}>
                No
            </Button>

            <Button btnClass={`w-[100px] ${answers[i] === "Yes" ? 'bg-sky-300/50' : ''}`} on:click={() => setAnswer(i, "Yes")}>
                Yes
            </Button>
        </p>
    </section>
{/each}



<section class="z-10 max-w-3xl w-[90%] mt-20 m-auto text-center">
    <Button>
        Submit
    </Button>
</section>