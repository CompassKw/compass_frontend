export function useParentPath<T = boolean>(url: string) {
  const route = useRoute();
  if (route.path.startsWith(url) || route.path.startsWith("/ar" + url)) {
    return true;
  } else {
    return false;
  }
}
