<script lang="ts">
  import ThemeToggle from './ThemeSwitch.svelte';
  import { fade } from 'svelte/transition';
    export let title: string = 'Page';
  </script>

  <header class="border-b border-surface-700 h-12 flex items-center justify-center overflow-hidden heading-font-color">
    <ThemeToggle />
    <h1 class="text-3xl font-semibold" transition:fade={{duration: 70}}>{title}</h1>
  </header>
  
  <div class="flex">
    <aside class="w-45 border-r border-surface-700 h-screen flex flex-col justify-start p-4 anchor-font-color">
      <a href="/" class="menu-link">Home</a>
      <a href="/payments" class="menu-link">Payments</a>
      <a href="/settings" class="menu-link">Settings</a>
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