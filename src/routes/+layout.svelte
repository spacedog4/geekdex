<script lang="ts">
  import Footer from "$lib/components/footer.svelte";
  import "../app.css";

  let { children } = $props();
</script>

{@render children()}
<Footer />
