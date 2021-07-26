<template>
  <header class="container">
    <div class="gc-header_top">
      <NuxtLink to="/">
        <object type="image/svg+xml" data="~/assets/icons/logo.svg.svg">
          <img
            class="gc-logo"
            src="~/static/images/logo.png"
            alt="GIPHY Logo"
          />
        </object>
      </NuxtLink>
      <button class="gc-login-button">Login</button>
    </div>
    <SearchBar />
  </header>
</template>

<style lang="scss" scoped>
@import '~assets/scss/_variables.scss';
.gc-header_top {
  padding: 1rem 0;
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  grid-template-areas: 'logo nav login';
  gap: 3.2rem;
}

.gc-logo {
  grid-area: logo;
  max-width: 18rem;
}

.gc-login-button {
  grid-area: login;
  place-self: end;
  color: $color-text;
  background-color: $color-layout_container;
  border: none;
  padding: 1.6rem 2.4rem;
  font-size: 1.6rem;
  font-weight: 700;
  transition: background-color ease-in-out 0.2s;

  &:hover {
    background-color: lighten($color-layout_container, 10%);
  }
}
</style>
