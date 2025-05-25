<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';

    
    let {data} = $props();
    let products = data.products;
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {#each products as product}
            <!-- ProductCard -->
            <ProductCard {...product}/>
        {/each}
    </div>