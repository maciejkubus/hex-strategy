<script lang="ts">
	import MapTile from '$lib/components/MapTile.svelte';
	import HexGetter from '$lib/utils/HexGetter';
	import MapGenerator from '$lib/utils/MapGenerator';

	const map = MapGenerator.generate();
</script>

<div class="relative h-screen w-screen overflow-hidden">
	{#each map.tiles as row, index}
		{#each row as tile}
			<MapTile hex={tile}></MapTile>
		{/each}
	{/each}
</div>
