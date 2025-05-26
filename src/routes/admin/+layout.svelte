<script lang="ts">
    import { page } from '$app/state'
    import Nav from '$lib/components/Nav.svelte';
	import { cn } from '$lib/utils';

    let { children } = $props();
    let pathname = $derived(page.url.pathname);
</script>

<Nav>
    {@render navLink({href: '/admin', text:'dashboard'})}
    {@render navLink({href: '/admin/products', text:'products'})}
    {@render navLink({href: '/admin/users', text:'customer'})}
    {@render navLink({href: '/admin/orders', text:'sales'})}

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

<div class="container mx-auto px-4 py-8"> <!-- modified diff from tutorial--> 
    {@render children()}
</div>





{#snippet navLink({href, text}:{href:string, text:string})}
    <a {href} class={cn('hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground p-4 capitalize',
    pathname === href && 'bg-background text-foreground'
    )}>{text}</a>
{/snippet}