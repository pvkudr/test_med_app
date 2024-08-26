export const API_URL =
  window.location.hostname === "localhost"
    ? "https://pvkudr-8181.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/"
    : "https://pvkudr-8181.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/";
console.log("API_URL :", API_URL);

export const SERVER_STATUS = false