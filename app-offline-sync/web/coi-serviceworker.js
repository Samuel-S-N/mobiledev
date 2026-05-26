/* coi-serviceworker v0.1.7 - Guido Zuidhof, licensed under MIT
 * Intercepts responses and adds COOP/COEP headers so SharedArrayBuffer
 * is available (required by expo-sqlite's WebAssembly backend on web).
 */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

async function handleFetch(event) {
  if (
    event.request.cache === "only-if-cached" &&
    event.request.mode !== "same-origin"
  ) {
    return;
  }

  let response;
  try {
    response = await fetch(event.request);
  } catch (err) {
    console.error("[coi-serviceworker]", err);
    return;
  }

  if (response.status === 0) return response;

  const headers = new Headers(response.headers);
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Cross-Origin-Embedder-Policy", "require-corp");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

self.addEventListener("fetch", (event) =>
  event.respondWith(handleFetch(event))
);
