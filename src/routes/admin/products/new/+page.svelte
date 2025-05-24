<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import * as Form from '$lib/components/ui/form';
	import { addFormSchema } from '$lib/formSchema.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters'; // Adjust the path as needed
	import { Input } from "$lib/components/ui/input"
	

	let {data} = $props();
	let form = superForm(data.form,{
		validators: zodClient(addFormSchema)
	});
	let {form:formData, enhance, delayed} = form;
</script>

<form method="POST" class="space-y-8" action="/admin/product/new" enctype="multipart/form-data">
	<Form.Field {form} name="name">
		<Form.Control>
			
			{#snippet children({ props })}
				<Form.Label>Name</Form.Label>
				<Input {...props} bind:value={$formData.name} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
</form>
