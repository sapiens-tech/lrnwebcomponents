import { pathResolver, SimpleIconsetStore } from "./simple-iconset.js";
[
  "av",
  "communication",
  "device",
  "editor",
  "hardware",
  "icons",
  "image",
  "maps",
  "notification",
  "places",
  "social",
].forEach((i) => {
  SimpleIconsetStore.registerIconset(
    i,
    `${pathResolver(import.meta.url)}svgs/${i}/`
  );
});
