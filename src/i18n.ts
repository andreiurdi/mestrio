import { getRequestConfig } from "next-intl/server";

const locales = ["en", "ro"];

export const defaultLocale = "en";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = requestLocale;

  // Validate that the requested locale is supported
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../public/locales/${locale}.json`)).default,
  };
});
