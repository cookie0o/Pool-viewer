<script lang="ts">
  import { onMount } from "svelte";
  import LayoutShell from "$lib/components/LayoutShell.svelte";
  import {
    getReturnRate, 
    getdataXMRPOOLEU
  } from "$lib/TS/Api";
  import { currencySymbols } from "$lib/TS/List";

  let hashrate = "0 KH/s";
  let balance = 0.0;
  let currency = "eur";
  let convertedValue: string = "";
  let symbol = currencySymbols[currency] || currency.toUpperCase();

  onMount(async () => {
    if (typeof window !== "undefined") {
      // if address is none redirect to the settings page
      let address = localStorage.getItem("address")
      if (address == null) {
        window.location.replace("/settings");
        alert("No Monero address defined.");
      } else {
        // get data
        await getdataXMRPOOLEU(address);

        balance = parseFloat(localStorage.getItem("balance") || "0.0");
        currency = localStorage.getItem("currency") || "usd";
        hashrate = localStorage.getItem("hashrate") || "0 KH/s";

        symbol = currencySymbols[currency] || currency.toUpperCase();
      
        const rate = await getReturnRate(currency);
      
        if (rate !== null) {
          convertedValue = (balance * rate).toFixed(2);
        } else {
          convertedValue = "Error";
          symbol = "";
        }
      }
    }
  });
</script>


<LayoutShell title="Home">
  <div style="display: flex; justify-content: space-between; gap: 16px; width: 100%; height: 90px;">
    <!-- Card 1 -->
    <div class="card preset-filled-surface-100-900 p-2 text-center" style="flex-grow: 0.5;">
      <h5 class="h5">Total Hashrate</h5>
      <div class="data-block">
        <p class="value">{hashrate}</p>
      </div>
    </div>

    <!-- Card 2 -->
    <div class="card preset-filled-surface-100-900 p-2 text-center" style="flex-grow: 1;">
      <h5 class="h5">Pool Balance</h5>
      <div class="data-block">
        <p class="value">{balance} XMR</p>
        <span class="vr border-l-4"></span>
        <p class="value">{convertedValue ? `${convertedValue} ${symbol}` : "Loading..."}</p>
      </div>
    </div>
  </div>
</LayoutShell>


<style>
  .data-block {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    margin-top: 8px;
  }

  .value {
    flex: 1;
    text-align: center;
    font-size: 25px;
  }

  .text-center {
    text-align: center;
  }
</style>