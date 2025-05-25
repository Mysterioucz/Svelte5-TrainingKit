<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { formatCurrency, formatNumber } from '$lib/utils.js';
	import { CheckCircle, XCircle, MoreVertical, SunMedium } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/ui/input';

	let { data } = $props();
</script>

<div class="">
	<PageHeader>Sales</PageHeader>
</div>

{#if data.orders.length === 0}
	<p>No sales found</p>
{:else}
	{@render orderTable()}
{/if}

{#snippet orderTable()}
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-0">Product</Table.Head>
				<Table.Head>Customer</Table.Head>
				<Table.Head>Price Paid</Table.Head>
				<Table.Head class="w-0 text-right">
					<span class="sr-only">Actions</span>
				</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.orders as order}
				<Table.Row>
					<Table.Cell>
						{order.product.name}
					</Table.Cell>
					<Table.Cell>{order.user.email}</Table.Cell>
					<Table.Cell
						>{formatCurrency(order.priceInCents / 100)}</Table.Cell
					>
					<Table.Cell class="text-right">
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<MoreVertical />
								<span class="sr-only">Action</span>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<!-- Toggle Active Status -->
								<form action="?/deleteOrder" method="POST" use:enhance>
									<button type="submit" class="text-destructive w-full">
										<DropdownMenu.Item>Delete</DropdownMenu.Item>
									</button>
									<input type="hidden" name="id" value={order.id} />
								</form>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
{/snippet}
