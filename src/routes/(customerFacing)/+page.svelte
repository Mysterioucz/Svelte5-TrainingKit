<script lang="ts">
	import ProductGridSection from '$lib/components/ProductGridSection.svelte';

    
    let {data} = $props();
</script>

<div class="space-y-12">
    <ProductGridSection title='most popular' products={data.mostPopularProducts}/>
    <ProductGridSection title='newest' products={data.newestProducts}/>
</div>
