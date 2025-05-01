<script lang="ts">
	import type Hex from '$lib/utils/Hex';
	import { onMount } from 'svelte';

	export let hex: Hex;

	let loaded = false;

	const render = {
		width: 130,
		height: 129,
		offset: 64,
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
		console.log(hex.data.resource);
		return styles;
	};

	onMount(() => {
		render.x = (render.width + render.offset) * hex.x + (hex.y % 2 == 1 ? 96 : 0);
		render.y = (render.height * hex.y) / 2.28;
		render.z = hex.y;
		loaded = true;
	});
</script>

{#if loaded}
	<div class="map-tile absolute inline-block bg-no-repeat" style={getStyles()}></div>
{/if}

<style>
	.map-tile {
		background-position: -64px -54px;
		background-size: 256px;
	}
</style>
