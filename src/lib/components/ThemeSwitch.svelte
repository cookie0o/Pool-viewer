<script lang="ts">
    import { Moon, Sun } from '@lucide/svelte/icons';
    import { onMount } from 'svelte';
  
    let isChecked: boolean = false; // This controls the toggle switch
    let theme: 'light' | 'dark' = 'light'; // Current theme
  
    // Load the saved theme from localStorage when the component mounts
    onMount(() => {
      const savedTheme = localStorage.getItem('mode');
      if (savedTheme === 'dark') {
        theme = 'dark'; // Set theme to dark
        isChecked = true; // Make the switch checked
      } else {
        theme = 'light'; // Set theme to light
        isChecked = false; // Make the switch unchecked
      }
      applyTheme();
    });
  
    // This function handles the toggle switch action
    function toggleTheme(event: Event) {
      const input = event.target as HTMLInputElement;
      const mode = input.checked ? 'dark' : 'light';
      document.documentElement.setAttribute('data-mode', mode);
      localStorage.setItem('mode', mode);
      setChecked(input.checked); // Update the checked state
      theme = input.checked ? 'dark' : 'light'; // Update the theme
    }
  
    // Apply the current theme to the document
    function applyTheme() {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  
    // Sync the checked state with the theme
    function setChecked(checked: boolean) {
      isChecked = checked;
    }
  </script>
  
  <!-- Theme toggle button positioned in the top-left corner -->
  <button class="absolute top-1.5 right-2 p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition">
    <label for="theme-toggle">
      {#if theme === 'dark'}
        <Sun class="w-5 h-5 text-yellow-400" />
      {:else}
        <Moon class="w-5 h-5 text-gray-800" />
      {/if}
      <input
        type="checkbox"
        id="theme-toggle"
        class="hidden"
        checked={isChecked}
        on:change={toggleTheme}
      />
    </label>
  </button>
  