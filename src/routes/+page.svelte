<script>
  import LayoutShell from '$lib/components/LayoutShell.svelte';
</script>

<LayoutShell title="Home">
  <div style="display: flex; justify-content: space-between; gap: 16px; width: 100%; height: 100px;">
    <!-- Card 1 -->
    <div class="card preset-filled-surface-100-900 p-4 text-center" style="flex-grow: 1;">
      <h5 class="h5">Total Hashrate</h5>
      <div class="data-block">
        <p class="value">80 KH/s</p>
      </div>
    </div>

    <!-- Card 2 -->
    <div class="card preset-filled-surface-100-900 p-4 text-center" style="flex-grow: 1;">
      <h5 class="h5">Pool Balance</h5>
      <div class="data-block">
        <p class="value">5.994345 XMR</p>
        <span class="vr border-l-4"></span>
        <p class="value">5.99 €</p>
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
