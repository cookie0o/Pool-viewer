<script lang="ts">
  import LayoutShell from '$lib/components/LayoutShell.svelte';
  import { onMount } from 'svelte';
  import { currencyCodes, currencyCodeMap } from './List.js';

  onMount(() => {
    const saved = localStorage.getItem('moneroAddress');
    if (saved) {
      address = saved;
    }
  });

  let address: string = '';
  let isValid: boolean = false;

  const moneroAddressPattern = /^[A-Za-z0-9]{95}$/;

  function validateAddress() {
    isValid = moneroAddressPattern.test(address);
    if (!isValid) {
      alert("Please enter a valid Monero address.");
      address = '';
    } else {
      localStorage.setItem('moneroAddress', address);
    }
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

  <!-- Fita Currency Input -->
  <label class="label">
    <span class="label-text">Fiat Currency</span>
    <select class="select">
      {#each currencyCodes as currency}
       <option value={currencyCodeMap[currency.toLocaleLowerCase()]}>{currency}</option>
      {/each}
    </select>
  </label>
</LayoutShell>

<style>
  span {
    font-size: 15px
  }
  .select {
    width: 300px;
  }
</style>
  