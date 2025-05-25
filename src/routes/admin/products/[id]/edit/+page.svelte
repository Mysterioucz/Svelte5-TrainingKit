<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import * as Form from '$lib/components/ui/form';
	import { addFormSchema } from '$lib/formSchema.js';
	import { fileProxy, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters'; // Adjust the path as needed
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { formatCurrency } from '$lib/utils.js';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Loader } from 'lucide-svelte';
    import { page } from '$app/state';

	let { data } = $props();
	const form = superForm(data.form, {
		validators: zodClient(addFormSchema.partial({image:true, file:true}))
	});

	const { form: formData, enhance, delayed } = form;
	const image = fileProxy(formData, 'image');
	const file = fileProxy(formData, 'file');

</script>

<PageHeader>Edit Product</PageHeader>

<!-- I have remove the action path since The SvelteKit correct it for me -->
<form
	method="POST"
	class="my-4 space-y-8"
	enctype="multipart/form-data"
    use:enhance
>
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Name</Form.Label>
				<Input {...props} bind:value={$formData.name} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="priceInCents">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Price in cents</Form.Label>
				<Input {...props} bind:value={$formData.priceInCents} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<div class="text-muted-foreground">
		{formatCurrency($formData.priceInCents / 100)}
	</div>
	<Form.Field {form} name="description">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Description</Form.Label>
				<Textarea {...props} bind:value={$formData.description} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="file">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>File</Form.Label>
				<Input {...props} type="file" bind:files={$file} />
                <div class="text-muted-foreground">
					{data.product?.filePath}
                </div>
            {/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="image">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Image</Form.Label>
				<Input {...props} accept="images/*" type="file" bind:files={$image} />
                <img src="{data.product?.imagePath}" alt="product" class="h-[200px] w-[400px] object-cover" />
            {/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Button type="submit">
		{#if $delayed}
			<Loader class="size-4 animate-spin" />
		{:else}
			Save
		{/if}
	</Button>
</form>
