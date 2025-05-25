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
	<PageHeader>Customer</PageHeader>
</div>

{#if data.users.length === 0}
	<p>No customer found</p>
{:else}
	{@render userTable()}
{/if}

{#snippet userTable()}
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-0">Email</Table.Head>
				<Table.Head>Orders</Table.Head>
				<Table.Head>Value</Table.Head>
				<Table.Head class="w-0 text-right">
					<span class="sr-only">Actions</span>
				</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.users as user}
				<Table.Row>
					<Table.Cell>
						{user.email}
					</Table.Cell>
					<Table.Cell>{formatNumber(user.Order.length)}</Table.Cell>
					<Table.Cell
						>{formatCurrency(
							user.Order.reduce((sum, o) => o.priceInCents + sum, 0) / 100
						)}</Table.Cell
					>
					<Table.Cell class="text-right">
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<MoreVertical />
								<span class="sr-only">Action</span>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<!-- Toggle Active Status -->
								<form action="?/deleteUser" method="POST" use:enhance>
									<button type="submit" class="text-destructive w-full">
										<DropdownMenu.Item>Delete</DropdownMenu.Item>
									</button>
									<input type="hidden" name="id" value={user.id} />
								</form>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
{/snippet}
