<script lang="ts">
    import { onMount } from 'svelte';

    // --- configurable props ---
    let color: string = '#1c398e';    // glyph color
    let fontSize: number = 20;        // px
    let gap: number = 4;             // horizontal gap between columns (px)
    let density: number = 2.0;        // vertical spacing factor
    let rowsPerSecond: number = 3;    // speed (rows per second)
    let trailLength: number = 10;     // trailing glyph count
    let glow: number = 10;            // glow blur radius (set to 0 to disable)
    let charset: string = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    // --- internals ---
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let columns = 0;
    let row: number[] = [];
    let acc: number[] = [];
    let colVariance: number[] = [];

    onMount(() => {
        ctx = canvas.getContext('2d')!;

        const step = () => fontSize * density;

        const resize = () => {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            columns = Math.max(1, Math.floor(canvas.width / (fontSize + gap)));
            row = new Array(columns);
            acc = new Array(columns);
            colVariance = new Array(columns);

            const maxStart = Math.ceil(canvas.height / step()) + 20;
            for (let i = 0; i < columns; i++) {
                row[i] = Math.floor(Math.random() * maxStart) - 20;
                acc[i] = Math.random();
                colVariance[i] = 0.9 + Math.random() * 0.2;
            }
        };

        resize();
        addEventListener('resize', resize);

        let prev = performance.now();

        function draw(now: number) {
            const dt = (now - prev) / 1000;
            prev = now;

            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px monospace`;

            // apply glow
            ctx.shadowBlur = glow;
			ctx.shadowOffsetX = 10;
			ctx.shadowOffsetY = -10;
			ctx.shadowColor = withAlpha(color, 0.9); // near-opaque glow color

            const s = step();

            for (let i = 0; i < columns; i++) {
                const speedRows = rowsPerSecond * colVariance[i];
                acc[i] += speedRows * dt;
                if (acc[i] >= 1) {
                    const steps = Math.floor(acc[i]);
                    row[i] += steps;
                    acc[i] -= steps;
                }

                const x = i * (fontSize + gap);
                const yHead = row[i] * s;

                const maxTrail = Math.max(0, Math.floor(trailLength));
                for (let t = 0; t <= maxTrail; t++) {
                    const y = yHead - t * s;
                    if (y < -s) break;
                    if (y > canvas.height + s) continue;

                    const alpha = t === 0 ? 1 : Math.max(0, 1 - t / (maxTrail + 1));
                    ctx.fillStyle = withAlpha(color, alpha);
                    const ch = charset.charAt((Math.random() * charset.length) | 0);
                    ctx.fillText(ch, x, y);
                }

                if (yHead - maxTrail * s > canvas.height) {
                    row[i] = -Math.floor(Math.random() * 20);
                    acc[i] = Math.random();
                }
            }

            requestAnimationFrame(draw);
        }

        requestAnimationFrame((t) => {
            prev = t;
            draw(t);
        });

        return () => removeEventListener('resize', resize);
    });

    function withAlpha(hex: string, a: number) {
        if (hex.startsWith('#')) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        }
        if (hex.startsWith('rgb(')) return hex.replace('rgb(', 'rgba(').replace(')', `, ${a})`);
        if (hex.startsWith('rgba(')) return hex.replace(/rgba\(([^,]+,[^,]+,[^,]+),[^)]+\)/, `rgba($1, ${a})`);
        return hex;
    }
</script>

<canvas bind:this={canvas} class="fixed top-0 left-0 w-full h-full -z-50 blur-[1px]"></canvas>
