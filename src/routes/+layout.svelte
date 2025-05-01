<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="fixed inset-0 flex h-screen w-screen overflow-hidden bg-neutral-900 text-white">
	<div class="relative h-screen w-screen">
		{@render children()}
	</div>
</div>
