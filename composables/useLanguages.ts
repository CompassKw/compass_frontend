export function useLanguages<T = Language[]>(): T {
  const languages = [
    { name: "arabic", value: "ar", dir: "rtl", iso: "eg" },
    { name: "english", value: "en", dir: "ltr", iso: "us" },
  ];
  return languages as T;
}
