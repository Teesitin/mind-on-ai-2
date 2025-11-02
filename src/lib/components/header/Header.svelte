<script lang="ts">
    import { writable } from 'svelte/store';
    import { browser } from '$app/environment';

    const currentPage = writable('');

    if (browser) {
        currentPage.set(window.location.pathname);

        window.addEventListener('popstate', () => {
            currentPage.set(window.location.pathname);
        });

        window.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target instanceof HTMLAnchorElement && target.href.startsWith(window.location.origin)) {
                currentPage.set(target.pathname);
            }
        });
    }

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Survay', path: '/survay' },
        { name: 'Report', path: '/report' },
        { name: 'About', path: '/about' }
    ];
</script>

<div class="sticky top-4 flex justify-center z-50 m-4">
    <nav class="flex items-center gap-6 px-8 py-3 bg-black/40 border border-blue-900 backdrop-blur-xs rounded-full shadow-[0_0_20px_rgba(39,80,245,0.6)] text-blue-300">
        {#each links as { name, path }}
            <a
                href={path}
                class="hover:text-yellow-500 hover:font-black hover:scale-110 transition"
                class:text-yellow-500={$currentPage === path}
            >{name}</a>
        {/each}
    </nav>
</div>
