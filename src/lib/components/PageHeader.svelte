<script lang="ts">
	import type { Snippet } from "svelte";

    type PageHeaderType = {
        children:Snippet;
    }

    let {children}:PageHeaderType = $props();
</script>
<div class="mb text-4xl">
    {@render children()}
</div>