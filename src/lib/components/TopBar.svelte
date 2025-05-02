<script lang="ts">
	import { resourcesStore } from '$lib/stores/resources.store';
	import type { ResourcesStore } from '$lib/types/ResourcesStore.interface';
	import ResourceIndicator from './ResourceIndicator.svelte';

	let resources: ResourcesStore;

	resourcesStore.subscribe((value) => {
		resources = value;
	});
</script>

<div class="absolute top-0 right-0 left-0 z-[9999] h-8">
	<div class="relative flex h-12 w-screen items-center gap-4 px-4 py-2 text-lg">
		<div class="absolute inset-0 bg-neutral-900 opacity-90"></div>
		<ResourceIndicator
			icon={'/assets/icons/population.png'}
			amount={resources.population}
			name={'Population'}
		/>
		<ResourceIndicator
			icon={'/assets/icons/technology.png'}
			amount={resources.technology}
			name={'Technology'}
		/>
		<ResourceIndicator icon={'/assets/icons/money.png'} amount={resources.money} name={'Money'} />
		<div class="mr-4 h-8 w-0.5 bg-neutral-50"></div>
		<ResourceIndicator icon={'/assets/icons/wood.png'} amount={resources.wood} name={'Wood'} />
		<ResourceIndicator icon={'/assets/icons/stone.png'} amount={resources.stone} name={'Stone'} />
		<ResourceIndicator icon={'/assets/icons/wheat.png'} amount={resources.wheat} name={'Wheat'} />
		<ResourceIndicator icon={'/assets/icons/meat.png'} amount={resources.meat} name={'Meat'} />
		<ResourceIndicator icon={'/assets/icons/brick.png'} amount={resources.brick} name={'Bricks'} />
		<ResourceIndicator icon={'/assets/icons/iron.png'} amount={resources.iron} name={'Iron'} />
	</div>
</div>
