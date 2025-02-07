export function SlicePathname(router_pathname) {
  // convert path to array of pages spliting by "/"
  const pages_array = router_pathname.split('[')[0] // pathname: /product/bg15/application/quote
  return pages_array;
}
