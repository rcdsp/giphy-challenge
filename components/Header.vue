<template>
  <header class="container">
    <div class="gc-header_top">
      <NuxtLink to="/">
        <img class="gc-logo" src="~/static/images/logo.png" alt="GIPHY Logo" />
      </NuxtLink>
    </div>
    <SearchBar />
  </header>
</template>

<style scoped>

.gc-header_top {
  padding: 1rem 0;
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  gap: 3.2rem;
}

.gc-logo {
  max-width: 18rem;
}
</style>
