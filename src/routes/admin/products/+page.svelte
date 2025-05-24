<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { formatCurrency, formatNumber } from '$lib/utils.js';
	import { CheckCircle, XCircle, MoreVertical } from 'lucide-svelte';
	import { enhance } from '$app/forms';

	let { data } = $props();
</script>

<div class="flex items-center justify-between gap-4">
	<PageHeader>Product</PageHeader>
	<Button class="bg-primary rounded-sm px-4 py-3 text-white" href="/admin/products/new"
		>Add product</Button
	>
</div>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-0">
				<span class="sr-only">Available for purchase</span>
			</Table.Head>
			<Table.Head>Name</Table.Head>
			<Table.Head>Price</Table.Head>
			<Table.Head>Order</Table.Head>
			<Table.Head class="w-0">
				<span class="sr-only">Actions</span>
			</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each data.products as product (product.id)}
			<Table.Row>
				<Table.Cell>
					{#if product.isAvailableForPurchase}
						<span class="sr-only">available</span>
						<CheckCircle />
					{:else}
						<span class="sr-only">Unavailable</span>
						<XCircle />
					{/if}
				</Table.Cell>
				<Table.Cell>{product.name}</Table.Cell>
				<Table.Cell>{formatCurrency(product.priceInCents / 100)}</Table.Cell>
				<Table.Cell>{formatNumber(product._count.Order)}</Table.Cell>
				<Table.Cell class="text-right">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<MoreVertical />
							<span class="sr-only">Action</span>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Item>
								<a href={`/admin/products/${product.id}/download`} download> Download </a>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<a href={`/admin/products/${product.id}/edit`}> Edit </a>
							</DropdownMenu.Item>
							<!-- Toggle Active Status -->
							<form action="?/toggleAvailability" method="POST" use:enhance>
								<Button type="submit" class="w-full">
									<DropdownMenu.Item>
										{#if product.isAvailableForPurchase}
											Deactivate
										{:else}
											Activate
										{/if}
									</DropdownMenu.Item>
								</Button>
								<input type="hidden" name="id" value={product.id} />
								<input
									type="checkbox"
									name="isAvailableForPurchase"
									class="hidden"
									checked={!product.isAvailableForPurchase}
								/>
							</form>
							<!-- Delete -->
							<form action=""></form>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
