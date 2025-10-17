<script lang="ts">
    export let link = "/";
    export let btnClass = "";
</script>

<a href="{link}"
    class="px-8 py-3 rounded-full border border-blue-800
            bg-blue-900/30 backdrop-blur-md 
            text-blue-300 text-lg font-semibold 
            shadow-[0_0_15px_rgba(39,80,245,0.5)]
            hover:shadow-[0_0_25px_rgba(39,80,245,0.8)]
            hover:scale-105
            hover:text-blue-400 hover:border-blue-600
            transition-all duration-300
            {btnClass}
            ">
    <slot>
        no-text
    </slot>
</a>