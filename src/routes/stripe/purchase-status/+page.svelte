<script lang="ts">
  import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';

  // Get query params from the URL
  let searchParams = page.url.searchParams;
  let status = searchParams.get('redirect_status');
  let paymentIntent = searchParams.get('payment_intent');
</script>

<div class="max-w-lg mx-auto mt-16 p-8 bg-white rounded shadow">
  <h1 class="text-2xl font-bold mb-4">Payment Status</h1>
  {#if status === 'succeeded'}
    <p class="text-green-600">Your payment was successful! 🎉</p>
  {:else if status === 'failed'}
    <p class="text-red-600">Your payment failed. Please try again.</p>
  {:else if status === 'canceled'}
    <p class="text-yellow-600">Your payment was canceled.</p>
  {:else}
    <p>Processing your payment...</p>
  {/if}
  {#if paymentIntent}
    <div class="mt-4 text-sm text-gray-500">Payment Intent: {paymentIntent}</div>
  {/if}
  <Button class="mt-4 hover:bg-blue-700">
      <a href="/" class="text-white">Go to Home page</a>
  </Button>
</div>