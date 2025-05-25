<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Form from '$lib/components/ui/form';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$lib/formSchema';
	import { Loader } from 'lucide-svelte';

	let { data } = $props();
	const form = superForm(data.form, {
		validators: zodClient(loginSchema)
	});

	const { form: formData, enhance, delayed } = form;
</script>

<form method="POST" class="grid h-screen w-full place-items-center" use:enhance>
	<Card.Root class="mx-auto w-full max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Login</Card.Title>
			<Card.Description
				>Enter your username and password below to login to your account</Card.Description
			>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-4">
				<Form.Field {form} name="username">
					<Form.Control>
						{#snippet children({props})}
							<Form.Label class="text-sm">Username</Form.Label>
							<Input type="text"  {...props} bind:value={$formData.username}/>
						{/snippet}
					</Form.Control>
				</Form.Field>
				<Form.Field {form} name="password">
					<Form.Control>
						{#snippet children({props})}
							<Form.Label class="text-sm">Password</Form.Label>
							<Input type="password" {...props} bind:value={$formData.password}/>
						{/snippet}
					</Form.Control>
				</Form.Field>
			</div>
		</Card.Content>
		<Card.Footer class="flex justify-end">
			<Button type="submit" class="w-full">
				{#if $delayed}
					<Loader class="mr-2 h-4 w-4 animate-spin" />
				{:else}
					Sign in
				{/if}
			</Button>
		</Card.Footer>
	</Card.Root>
</form>
