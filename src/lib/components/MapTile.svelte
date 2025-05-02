<script lang="ts">
	import type Hex from '$lib/utils/Hex';
	import { onMount } from 'svelte';

	export let hex: Hex;

	let loaded = false;

	const render = {
		width: 70,
		height: 70,
		offset: 28,
		x: 0,
		y: 0,
		z: 0,
		resource: ''
	};

	const getStyles = () => {
		let styles = '';
		styles += 'width: ' + render.width + 'px; ';
		styles += 'height: ' + render.height + 'px; ';
		styles += 'top: ' + render.y + 'px; ';
		styles += 'left: ' + render.x + 'px; ';
		styles += 'z-index: ' + render.z + '; ';
		styles += `background-image: url('${hex.data.resource}');`;
		return styles;
	};

	onMount(() => {
		render.x = (render.width + render.offset) * hex.x + (hex.y % 2 == 1 ? 49 : 0);
		render.y = (render.height * hex.y) / 2.5;
		render.z = hex.y;
		loaded = true;
	});
</script>

{#if loaded}
	<div
		class="map-tile absolute inline-block bg-no-repeat text-center text-xs leading-10 text-black transition-all duration-150 hover:opacity-90"
		style={getStyles()}
	>
		#{hex.id}: {hex.neighbours.length}<br />
	</div>
{/if}

<style>
	.map-tile {
		background-position: -32px -27px;
		background-size: 128px;
	}
</style>
