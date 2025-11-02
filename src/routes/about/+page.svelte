<script lang="ts">
    import Button from "$lib/components/common/Button.svelte";
    import HackerBackground from "$lib/components/HackerBackground.svelte";
</script>

<section class="z-10 max-w-3xl w-[90%] mt-10 m-auto text-center rounded-xl backdrop-blur border p-4 border-blue-500/50">
    <h1 class="text-3xl">Howdy!</h1>
    <p>October 16, 2025</p>

    <p class="mt-4 leading-relaxed">
        My name is DeLayne Russell. I'm the creator of this site. A little about me: I'm currently working toward my Computer Engineering degree at UCF. I work as a freelance software engineer in my spare time, and I'm a hobbyist when it comes to all things electronic!
    </p>

    <p class="mt-4 leading-relaxed">
        Now, why am I building this site? Well, because AI has been at the forefront of everything these past few years, and I've heard almost every single opinion about it. From family, friends, clients, and even people chatting at the local Starbucks! But... it seems hard to truly gauge where people actually stand on AI.
    </p>

    <p class="mt-4 leading-relaxed">
        My opinion on AI? I love it! ... Well, the current version of it. But like many others, I worry about AI's unchecked rise. It's growing in power, and the speed of its improvement feels... unnatural. I want AI to be a beacon of hope and prosperity for humanity and I don't want its potential limited by biased fears or wild conspiracy theories, but I dont want to die for it. I want to understand its ins and outs, but to do that, we need time, and that's something the current industry isn't giving us.
    </p>  
    
    <p class="mt-4 leading-relaxed">
        <a href="https://keepthefuturehuman.ai/contest/" class="text-blue-400 underline" target="_blank">Keep The Future Human</a> is trying to do just that... keep the future human, not dominated by AI actors. The risk is real, I believe, but we need to start thinking about the best ways to regulate AI without destroying something that could become one of humanity's greatest advancements.
    </p>
</section>

<section class="z-10 max-w-3xl w-[90%] mt-20 m-auto text-center rounded-xl backdrop-blur border p-4 border-blue-500/50">
    <h1 class="text-3xl">How Things Currently Work</h1>
    <p>October 16, 2025</p>

    <p class="mt-4 leading-relaxed">
        Okay, this one's a bit more technical. The way I built this survey is actually pretty simple. Each question is linked to a specific type that measures a different aspect of how people feel about AI. Here's the table:
    </p> 

    <table class="w-full mt-6 border-collapse text-sm text-gray-300">
        <thead>
            <tr class="border-b border-blue-500/50 text-blue-300">
                <th class="p-2 text-left">Type</th>
                <th class="p-2 text-left">Description</th>
            </tr>
        </thead>
        <tbody>
            <tr class="border-b border-white/10 hover:bg-white/5 transition">
                <td class="p-2 font-semibold text-white/90">Acceptance <br>↔<br> Rejection</td>
                <td class="p-2">How much someone embraces or resists AI in general.</td>
            </tr>
            <tr class="border-b border-white/10 hover:bg-white/5 transition">
                <td class="p-2 font-semibold text-white/90">Safety <br>↔<br> Progress</td>
                <td class="p-2">Whether someone values caution and control over rapid AI advancement.</td>
            </tr>
            <tr class="border-b border-white/10 hover:bg-white/5 transition">
                <td class="p-2 font-semibold text-white/90">Human-Like <br>↔<br> Robotic</td>
                <td class="p-2">Preference for emotional, personable AI vs. strictly logical, mechanical AI.</td>
            </tr>
            <tr class="hover:bg-white/5 transition">
                <td class="p-2 font-semibold text-white/90">Savior <br>↔<br> Extinction</td>
                <td class="p-2">Belief that AI will help or save humanity vs. lead to its downfall.</td>
            </tr>
        </tbody>
    </table>
    
    <p class="mt-6 leading-relaxed">
        This could change in the future. This is just how I am doing it for now. Things might be added or removed later, but I feel these four categories are simple enough to understand while still giving enough information to show your general outlook on AI.
    </p>

    <p class="mt-4 leading-relaxed">
        Each question is tied to one of these types, and depending on your answer, you will receive one point toward that type. For example:
    </p>

    <p class="mt-4 leading-relaxed">
        "Ai is good for humanity?"<br>(No / Yes)
    </p>

    <p class="mt-4 leading-relaxed">
        Each type works like a slider that can move in either direction. When you pick "Yes," that type gains one point, shifting the slider toward the positive side. For example, toward the Savior end. If you pick "No", it loses one point, moving the slider toward the opposite side, in this case, toward Extinction.
    </p>

    <p class="mt-4 leading-relaxed">
        At the end, all your answers are added together to create a summary of where you stand with AI. In a future post, I plan to explain how that summary is calculated based on your position within each type.
    </p>
</section>




<section class="z-10 max-w-3xl w-[90%] mt-20 m-auto text-center rounded-xl backdrop-blur border p-4 border-blue-500/50">
    <h1 class="text-3xl">How the Report Works</h1>
    <p>November 2, 2025</p>

    <p class="mt-4 leading-relaxed">
        For the Report section, I decided to organize everything into four main tiers:
        <strong>Acceptance ↔ Rejection</strong>, <strong>Safety ↔ Progress</strong>,
        <strong>Human-Like ↔ Robotic</strong>, and <strong>Savior ↔ Extinction</strong>.
        Each of these represents a different dimension of how people perceive and interact with AI.
    </p>

    <p class="mt-4 leading-relaxed">
        At the bottom of the report, I added a set of detailed tables that break down what each tier means
        including the subtypes or “personalities” within each category. These help explain what your score
        says about your general attitude toward AI.
    </p>

    <p class="mt-4 leading-relaxed">
        Later on, I'm planning to include a short summary section between the gauges and the breakdown tables.
        This will give a quick overview of your results so you can instantly understand your overall position
        before diving into the detailed breakdowns.
    </p>

    <p class="mt-4 leading-relaxed">
        For now, this setup keeps things simple but informative, giving enough structure to make results easy
        to interpret while still leaving room for future updates and improvements.
    </p>
</section>
<section class="z-10 max-w-3xl w-[90%] mt-20 m-auto text-center rounded-xl backdrop-blur border p-4 border-blue-500/50">
    <h1 class="text-3xl">Beta Release and Next Steps</h1>
    <p>November 2, 2025</p>

    <p class="mt-4 leading-relaxed">
        Alright, the site is finally ready for its beta release. Everything right now is serverless, which means nothing is stored online and your answers never leave your device. I'm totally fine with that for now since it keeps things simple and private while testing.
    </p>

    <p class="mt-4 leading-relaxed">
        The next step I want to work on is connecting it to Firebase so results can be saved anonymously. That way, I can start building a public page that shows what people really think about AI and where everyone stands overall. I think that would be a cool way to visualize how opinions differ between people.
    </p>

    <p class="mt-4 leading-relaxed">
        Of course, before adding that, I'll have to look into privacy policies and make sure it's handled the right way. I want to make sharing completely optional, so people can decide if they want to go public with their results or keep them private. 
    </p>

    <p class="mt-4 leading-relaxed">
        That's the plan for now. The foundation is built, everything runs smoothly, and I'm happy with where things are at. From here, it's all about expanding and learning from what people actually think about AI.
    </p>
</section>





<div class="mt-20"></div>