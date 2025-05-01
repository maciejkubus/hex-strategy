<script lang="ts">
	import MapTile from '$lib/components/MapTile.svelte';
	import HexGetter from '$lib/utils/HexGetter';
	import MapGenerator from '$lib/utils/MapGenerator';

	const map = MapGenerator.generate();

	let container: HTMLDivElement;
	let isDragging = false;
	let startX: number, startY: number;
	let scrollLeft: number, scrollTop: number;

	function startDrag(e: { pageX: number; pageY: number }) {
		isDragging = true;
		container.style.cursor = 'grabbing';

		startX = e.pageX - container.offsetLeft;
		startY = e.pageY - container.offsetTop;

		scrollLeft = container.scrollLeft;
		scrollTop = container.scrollTop;
	}

	function stopDrag() {
		isDragging = false;
		container.style.cursor = 'grab';
	}

	function onDrag(e: { preventDefault: () => void; pageX: number; pageY: number }) {
		if (!isDragging) return;
		e.preventDefault();

		const x = e.pageX - container.offsetLeft;
		const y = e.pageY - container.offsetTop;

		const walkX = x - startX;
		const walkY = y - startY;

		container.scrollLeft = scrollLeft - walkX;
		container.scrollTop = scrollTop - walkY;
		console.log(container.scrollLeft, container.scrollTop);
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="h-screen w-screen cursor-grab overflow-hidden select-none"
	bind:this={container}
	on:mousedown={startDrag}
	on:mouseup={stopDrag}
	on:mouseleave={stopDrag}
	on:mousemove={onDrag}
>
	<div class="relative h-screen w-screen">
		{#each map.tiles as row, index}
			{#each row as tile}
				<MapTile hex={tile}></MapTile>
			{/each}
		{/each}
	</div>
</div>
