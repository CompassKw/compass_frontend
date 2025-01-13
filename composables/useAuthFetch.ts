export async function useAuthFetch<T = any>(url: string, options: any = {}) {
  const loading = useState("loading");
  const { locale } = useI18n();

  options.headers = {
    ...options.headers,
    lang: locale.value,
  };
  loading.value = true;
  const res = await useFetch<T>(url, options);
  loading.value = false;

  return res;
}
