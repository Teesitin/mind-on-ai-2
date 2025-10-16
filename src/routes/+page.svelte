<script lang="ts">
    import RedirectButton from "$lib/components/common/RedirectButton.svelte";
    import HackerBackground from "$lib/components/HackerBackground.svelte";
</script>

<HackerBackground/>

<section class="mt-10 text-center max-w-3xl m-auto w-[90%]">
    <h1 class="text-5xl">What is on your mind for AI?</h1>

    <p class="leading-relaxed text-lg text-gray-300 mt-8">
        Artificial Intelligence has dominated headlines, conversations, and workplaces
        for years yet it's becoming harder than ever to understand what people truly think.
        <br><br>
        Is AI growing too powerful? Developing too quickly? Or is it doing exactly as it should?
        We're seeking real perspectives from real people to help answer the questions shaping our future.
        <span class="text-blue-400 font-semibold">Voices like yours.</span>
    </p>

    <div class="flex items-center justify-center mt-8">
        <RedirectButton link="/survay">
            Take the Survay
        </RedirectButton>
    </div>
</section>


