<script lang="ts">
  import LayoutShell from "$lib/components/LayoutShell.svelte";
  import { onMount } from "svelte";
  import { currencyCodes, currencyCodeMap } from "$lib/TS/List";

  let isValid: boolean = false;
  let address: string = "";
  let currency: string = "";

  const moneroAddressPattern: RegExp = /^[A-Za-z0-9]{95}$/;

  onMount(() => {
    if (typeof window !== "undefined") {
      address = localStorage.getItem("address") || "";
      currency = localStorage.getItem("currency")  || "usd";
      // save the currency since it migh be the default and not saved
      localStorage.setItem("currency", currency)
    }
  });

  function validateAddress(): void {
    isValid = moneroAddressPattern.test(address);
    if (!isValid) {
      alert("Please enter a valid Monero address.");
      address = "";
    } else {
      localStorage.setItem("address", address);
    }
  }

  function saveCurrency(): void {
    localStorage.setItem("currency", currency);
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
