<template>
  <h2>這是前台</h2>
  <nav>
    <RouterLink to="/">
      Home
    </RouterLink> |
    <RouterLink to="/about">
      About
    </RouterLink> |
    <RouterLink to="/products">
      Products
    </RouterLink> |
    <RouterLink to="/cart">
      Cart
    </RouterLink> |
    <RouterLink to="/login">
      Log-in
    </RouterLink> |
    <RouterLink to="/admin/products">
      Admin - Products
    </RouterLink>
  </nav>
  <RouterView />
</template>
