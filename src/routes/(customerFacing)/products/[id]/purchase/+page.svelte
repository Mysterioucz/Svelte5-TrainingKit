<script lang="ts">
	import { formatCurrency } from '$lib/utils.js';
	import { onMount } from 'svelte';
    import { loadStripe } from '@stripe/stripe-js';
    import { Elements, PaymentElement, Address, LinkAuthenticationElement } from 'svelte-stripe';
	import { PUBLIC_SERVER_URL, PUBLIC_STRIPE_PUBLIC_KEY } from '$env/static/public';
	import * as Card from '$lib/components/ui/card';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Loader } from 'lucide-svelte';
    import {json} from '@sveltejs/kit';

    let stripe:any = $state();
    let elements:any = $state(undefined);
    let isLoading = $state(false);
    let errorMessage:string | undefined  = $state(undefined);
    let { data } = $props();
    let email:string | null = $state(null)

    onMount(async () => {

        stripe = await loadStripe(PUBLIC_STRIPE_PUBLIC_KEY);
        if (!stripe) {
            errorMessage = 'Failed to load Stripe';
        }
    });
    let productId = $derived(data.product.id);

    async function handleSubmit(e:SubmitEvent){
        e.preventDefault();
        if (!elements || !stripe || isLoading || !email) {
            errorMessage = 'Stripe or Elements not initialized';
            return;
        }
        isLoading = true;
        const orderExists = (await fetch('/api/order/exist',{
            method: 'POST',
            body: JSON.stringify({email, productId}),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();

        if(await orderExists){
            errorMessage = 'You have already purchased this product';
            isLoading = false;
            return;
        }

        if(stripe){
            stripe.confirmPayment({
                elements,
                confirmParams:{
                    return_url: `${PUBLIC_SERVER_URL}/stripe/purchase-status`
                }
            }).then((result:any) => {
                if (result.error) {
                    errorMessage = result.error.message;
                    isLoading = false;
                } else {
                    // Payment successful, handle success
                    console.log('Payment successful');
                    isLoading = false;
                }
            }).catch((error:any) => {
                errorMessage = error.message;
                isLoading = false;
            });
        }
    }

</script>

<div class="mx-auto w-full max-w-5xl space-y-8">
    <div class="flex items-center gap-4">
        <img class="object-scale-down max-w-lg max-h-svh" src={data.product.imagePath} alt="" />
        <div>
            <div class="text-lg">
                {formatCurrency(data.product.priceInCents / 100)}
            </div>
            <h1 class="text-3xl font-bold">
                {data.product.name}
            </h1>
            <p class="line-clamp-3 text-muted-foreground">
                {data.product.description}
            </p>
        </div>
    </div>
    <!-- stripe payment form -->
     <Elements clientSecret={data.clientSecret} {stripe} bind:elements>
        <form onsubmit={handleSubmit}>
            <Card.Root>
              <Card.Header>
                <Card.Title>Checkout</Card.Title>
                {#if errorMessage}
                    <p class="text-destructive">{errorMessage}</p>
                {/if}
                <!-- <Card.Description>Card Description</Card.Description> -->
              </Card.Header>
              <Card.Content>
                <LinkAuthenticationElement on:change={(e) => {
                    email = e.detail.value.email;
                }}/>
                <PaymentElement />
                <Address mode='billing'/>
              </Card.Content>
              <Card.Footer>
                <Button type="submit" size="lg" class="w-full" disabled={stripe === null || elements === undefined}>
                    {#if isLoading}
                        <Loader class="size-4 animate-spin" />
                    {:else}
                        Purchase {formatCurrency(data.product.priceInCents / 100)}
                    {/if}
                </Button>
              </Card.Footer>
            </Card.Root>
        </form>

     </Elements>
</div>