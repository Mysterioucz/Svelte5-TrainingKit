<script lang="ts">
	import { page } from '$app/state';
	import Nav from '$lib/components/Nav.svelte';
	import { cn } from '$lib/utils';
    import { Button } from '$lib/components/ui/button';

	let { children } = $props();
	let pathname = $derived(page.url.pathname);
</script>

<Nav>
	{@render navLink({ href: '/', text: 'home' })}
	{@render navLink({ href: '/products', text: 'products' })}
	{@render navLink({ href: '/orders', text: 'orders' })}

	<!-- logout button -->
	<form method="POST" action="/logout" class="justify-self-end">
		<button
			type="submit"
			class="cursor-pointer hover:bg-red-600 focus-visible:bg-secondary focus-visible:text-secondary-foreground p-4 capitalize"
		>
			Logout
		</button>
	</form>
</Nav>

{#snippet navLink({ href, text }: { href: string; text: string })}
	<a
		{href}
		class={cn(
			'hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground p-4 capitalize',
			pathname === href && 'bg-background text-foreground'
		)}>{text}</a
	>
{/snippet}

<div class="container mx-auto px-4 py-8">
	<!-- modified diff from tutorial-->
	{@render children()}
</div>
