<script lang="ts">
  import { base } from '$app/paths';
  import { 
    Microchip,
    Clock,
    Hash,
	  ThumbsUp,
	  X,
	  Pickaxe,
    CircleDollarSign
  } from '@lucide/svelte/icons';
  import { onMount } from "svelte";
  import LayoutShell from "$lib/components/LayoutShell.svelte";
  import { currencySymbols } from "$lib/TS/List";
  import {
    getReturnRate, 
    getdataXMRPOOLEU,
  } from "$lib/TS/Api";
  import {
  formatHashrate
  } from "$lib/TS/Functions";

  let hashrate_XMRPOOLEU = "0";
  let balance_XMRPOOLEU = 0.0;
  let total_hashrate = "0";
  let total_balance = 0.0;
  let currency = "eur";
  let convertedValue: string = "";
  let symbol = currencySymbols[currency] || currency.toUpperCase();

  onMount(async () => {
    if (typeof window !== "undefined") {
      // if address is none redirect to the settings page
      let address = localStorage.getItem("address")
      if (address == null) {
        window.location.replace(base+"/settings");
        alert("No Monero address defined.");
      } else {
        // get data
        await getdataXMRPOOLEU(address);

        currency = localStorage.getItem("currency") || "usd";

        // XMRPOOLEU data
        const XMRPOOLEU_data = localStorage.getItem('XMRPOOLEU');
        if (XMRPOOLEU_data) {
          const parsed = JSON.parse(XMRPOOLEU_data);
          balance_XMRPOOLEU = parsed.balance;
          hashrate_XMRPOOLEU = parsed.hashrate;
        } else {
          console.log('No data found for XMRPOOLEU');
        }

        total_hashrate = formatHashrate(parseInt(hashrate_XMRPOOLEU))
        total_balance = (balance_XMRPOOLEU)

        symbol = currencySymbols[currency] || currency.toUpperCase();
      
        const rate = await getReturnRate(currency);
      
        if (rate !== null) {
          convertedValue = (total_balance * rate).toFixed(2);
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
        <p class="value">{total_hashrate}</p>
      </div>
    </div>

    <!-- Card 2 -->
    <div class="card preset-filled-surface-100-900 p-2 text-center" style="flex-grow: 1;">
      <h5 class="h5">Pool Balance</h5>
      <div class="data-block">
        <p class="value">{total_balance} XMR</p>
        <span class="vr border-l-4"></span>
        <p class="value">{convertedValue ? `${convertedValue} ${symbol}` : "Loading..."}</p>
      </div>
    </div>
  </div>

  <p class="middle-text">Your Miner`s</p>

  <!-- labels -->
  <div class="grid grid-cols-6 gap-4 w-full text-center">
    <div class="labels">
      <Pickaxe class="w-4 h-5.7 pr-[2px]" />
      <p style="margin: 0;">Pool</p>
    </div>
    <div class="labels">
      <Microchip class="w-4 h-5.7 pr-[2px]" />
      <p style="margin: 0;">Worker ID</p>
    </div>
    <div class="labels">
      <Hash class="w-4 h-5.7 pr-[2px]" />
      <p style="margin: 0;">Hashrate</p>
    </div>
    <div class="labels">
      <ThumbsUp class="w-4 h-5.7 pr-[2px]" />
      <p style="margin: 0;">Accepted Hashed</p>
    </div>
    <div class="labels">
      <X class="w-4 h-5.7 pr-[2px]" />
      <p style="margin: 0;">Bad Hashes</p>
    </div>
    <div class="labels">
      <Clock class="w-4 h-5.7 pr-[2px]" />
      <p style="margin: 0;">Last Share</p>
    </div>
  </div>

  <!-- Miner Container´s -->
  <div id="miner-container">
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

  .middle-text {
    padding-top: 10px;
    font-size: 20px;
  }

  .labels {
    font-size: 17px;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>