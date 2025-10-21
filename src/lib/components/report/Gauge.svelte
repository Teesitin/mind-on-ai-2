<script lang="ts">
    export let min: number = -10;
    export let max: number = 10;
    export let value: number = 0;
    export let topLabel: string = "Top";
    export let bottomLabel: string = "Bottom";

    // midpoint
    const mid = (max - min) / 2 + min;

    // clamp value
    $: clamped = Math.max(min, Math.min(max, value));

    // calculate positive/negative % relative to midpoint
    $: percent = Math.abs(clamped - mid) / (max - min) * 200; // 0–100 up, 0–100 down
    $: isPositive = clamped > mid;
</script>

<div class="flex flex-col items-center gap-2 select-none">
    <!-- Top Label -->
    <p class="text-blue-300 text-sm font-semibold">{topLabel}</p>

    <!-- Gauge -->
    <div class="relative h-64 w-6 rounded-full bg-gradient-to-b from-blue-800/60 to-blue-900/30 
                border border-blue-500/40 shadow-[0_0_20px_rgba(39,80,245,0.4)] overflow-hidden">

        <!-- Middle line -->
        <div class="absolute top-1/2 left-0 w-full h-[2px] bg-blue-500/60 shadow-[0_0_8px_rgba(39,150,255,0.8)] -translate-y-1/2 z-10"></div>

        <!-- Positive fill (above midpoint) -->
        {#if isPositive}
            <div
                class="absolute bottom-1/2 left-0 w-full bg-gradient-to-t from-cyan-400 via-blue-400 to-blue-300
                       shadow-[0_0_25px_rgba(39,150,255,0.8)] rounded-t-full transition-all duration-500 ease-in-out origin-bottom"
                style={`height: ${percent / 2}%;`}
            ></div>
        {/if}

        <!-- Negative fill (below midpoint) -->
        {#if !isPositive}
            <div
                class="absolute top-1/2 left-0 w-full bg-gradient-to-b from-cyan-400 via-blue-400 to-blue-300
                       shadow-[0_0_25px_rgba(39,150,255,0.8)] rounded-b-full transition-all duration-500 ease-in-out origin-top"
                style={`height: ${percent / 2}%;`}
            ></div>
        {/if}
    </div>

    <!-- Bottom Label -->
    <p class="text-blue-300 text-sm font-semibold">{bottomLabel}</p>
</div>
