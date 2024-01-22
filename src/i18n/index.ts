import { createI18n } from "vue-i18n";

import enUS from "./en-US";
import zhCN from "./zh-CN";

type MessageSchema = typeof enUS;

const messages = { "en-US": enUS, "zh-CN": zhCN };

export type Locale = keyof typeof messages;

const i18n = createI18n<[MessageSchema], Locale, false>({
  legacy: false, // you must set `false`, to use Composition API
  locale: "en-US", // set locale
  fallbackLocale: "zh-CN", // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});

export default i18n;
