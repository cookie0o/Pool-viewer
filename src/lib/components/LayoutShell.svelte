<script lang="ts">
  import { base } from '$app/paths'
  import ThemeToggle from './ThemeSwitch.svelte';
  import { fade } from 'svelte/transition';

  export let title: string = 'Page';
</script>

<header class="flex items-center justify-center overflow-hidden preset-filled-surface-100-900">
  <ThemeToggle />
  <h1 class="h1" transition:fade={{duration: 70}}>{title}</h1>
</header>

<div class="flex">
  <aside class="w-45 flex flex-col justify-start p-4">
    <a href="{base}/" class="menu-link anchor">Home</a>
    <a href="{base}/payments" class="menu-link anchor">Payments</a>
    <a href="{base}/settings" class="menu-link anchor">Settings</a>
  </aside>

  <main class="flex-1 p-4">
    <slot />
  </main>
</div>

<style>
    header {
      height: 50px;
    }
    h1 {
      font-size: 35px;
      text-align: center;
      justify-content: space-evenly;
    }
  
    aside {
      padding-top: 10px;
      height: calc(100vh - 50px);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      text-align: left;
    }
  
    aside a {
      font-size: 30px;
      margin: 5px 0;
      transition: all 0.3s ease;
      text-decoration: none;
    }
  
    aside a:hover {
      padding-left: 5px;
    }
</style>