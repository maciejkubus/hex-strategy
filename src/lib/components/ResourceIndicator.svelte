<script lang="ts">
	export let icon: string;
	export let name: string;
	export let amount: number;
</script>

<div class="group relative flex items-center gap-2">
	<div class="h-8 w-8 bg-cover" style={`background-image: url('${icon}');`}></div>
	<div class="w-8 overflow-hidden text-2xl">{amount}</div>
	<div
		class="pointer-events-none absolute top-full translate-x-2 rounded-3xl bg-neutral-100 p-2 text-xs text-neutral-950 opacity-0 transition-all duration-200 group-hover:opacity-100"
	>
		{name}
	</div>
</div>
