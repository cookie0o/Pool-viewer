<script lang="ts">
  import LayoutShell from '$lib/components/LayoutShell.svelte';
  import { onMount } from 'svelte';
  import { currencyCodes, currencyCodeMap } from '$lib/JS/List';

  let address: string = '';
  let isValid: boolean = false;
  let currency: string = '';

  const moneroAddressPattern = /^[A-Za-z0-9]{95}$/;

  onMount(() => {
    if (typeof window !== 'undefined') {
      const savedAddress = localStorage.getItem('address');
      const savedCurrency = localStorage.getItem('currency');

      if (savedAddress) {
        address = savedAddress;
      }

      if (savedCurrency) {
        currency = savedCurrency;
      } else {
        currency = 'EUR';
      }
    }
  });

  function validateAddress() {
    isValid = moneroAddressPattern.test(address);
    if (!isValid) {
      alert("Please enter a valid Monero address.");
      address = '';
    } else {
      localStorage.setItem('address', address);
    }
  }

  function saveCurrency() {
    localStorage.setItem('currency', currency);
  }
</script>

<LayoutShell title="Settings">
  <!-- Monero Address Input -->
  <label class="label">
    <span class="label-text">Monero Address</span>
    <input
      class="input"
      type="text"
      bind:value={address}
      on:blur={validateAddress}
      placeholder="48v9SpsdkaNkVqS5LXyZCj1z5t9c3mJErPX46tk6XGxuH..."
    />
  </label>

  <div style="margin: 5px;"></div>

  <!-- Fiat Currency Selector -->
  <label class="label">
    <span class="label-text">Fiat Currency</span>
    <select class="select" bind:value={currency} on:change={saveCurrency}>
      {#each currencyCodes as currency}
        <option value={currencyCodeMap[currency.toLowerCase()]}>{currency}</option>
      {/each}
    </select>
  </label>
</LayoutShell>

<style>
  span {
    font-size: 15px;
  }
  .select {
    width: 300px;
  }
</style>
