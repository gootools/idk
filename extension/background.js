chrome.runtime.onInstalled.addListener(({ reason }) => {
  switch (reason) {
    case "install":
      return alert("Installed");
  }
});

let CUSTOM_URL;
chrome.storage.local.get("url", (data) => {
  CUSTOM_URL = data["url"];
  console.log({ CUSTOM_URL });
});

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (details.method === "POST" && CUSTOM_URL && details.url) {
      try {
        const postedString = decodeURIComponent(
          String.fromCharCode.apply(
            null,
            new Uint8Array(details.requestBody.raw[0].bytes)
          )
        );
        const data = JSON.parse(postedString);

        if (
          !details.url.includes(CUSTOM_URL) &&
          data.jsonrpc === "2.0" &&
          rpcMethods.includes(data.method)
        ) {
          return {
            redirectUrl: CUSTOM_URL,
          };
        }
      } catch (err) {}
    }
  },
  {
    urls: ["<all_urls>"],
    types: ["xmlhttprequest"],
  },
  ["blocking", "requestBody"]
);

chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    if (
      CUSTOM_URL &&
      ["OPTIONS", "POST"].includes(details.method) &&
      details.url.includes(CUSTOM_URL)
    ) {
      const idx = details.responseHeaders.findIndex(
        ({ name }) => name.toLowerCase() === "access-control-allow-origin"
      );

      if (idx >= 0) {
        details.responseHeaders.splice(idx, 1);
      }

      details.responseHeaders.push({
        name: "access-control-allow-origin",
        value: "*",
      });

      details.responseHeaders.push({
        name: "access-control-allow-headers",
        value: "*",
      });

      return { responseHeaders: details.responseHeaders };
    }
  },
  { urls: ["<all_urls>"], types: ["xmlhttprequest"] },
  ["blocking", "responseHeaders", "extraHeaders"]
);

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    if (
      CUSTOM_URL &&
      ["OPTIONS", "POST"].includes(details.method) &&
      details.url.includes(CUSTOM_URL)
    ) {
      return {
        requestHeaders: [
          {
            name: "content-type",
            value: "application/json",
          },
        ],
      };
    }
  },
  { urls: ["<all_urls>"], types: ["xmlhttprequest"] },
  ["blocking", "requestHeaders", "extraHeaders"]
);

const rpcMethods = [
  "getAccountInfo",
  "getBalance",
  "getBlock",
  "getBlockCommitment",
  "getBlockHeight",
  "getBlockProduction",
  "getBlocks",
  "getBlocksWithLimit",
  "getBlockTime",
  "getClusterNodes",
  "getEpochInfo",
  "getEpochSchedule",
  "getFeeCalculatorForBlockhash",
  "getFeeRateGovernor",
  "getFees",
  "getFirstAvailableBlock",
  "getGenesisHash",
  "getHealth",
  "getIdentity",
  "getInflationGovernor",
  "getInflationRate",
  "getInflationReward",
  "getLargestAccounts",
  "getLeaderSchedule",
  "getMaxRetransmitSlot",
  "getMaxShredInsertSlot",
  "getMinimumBalanceForRentExemption",
  "getMultipleAccounts",
  "getProgramAccounts",
  "getRecentBlockhash",
  "getRecentPerformanceSamples",
  "getSignaturesForAddress",
  "getSignatureStatuses",
  "getSlot",
  "getSlotLeader",
  "getSlotLeaders",
  "getSnapshotSlot",
  "getStakeActivation",
  "getSupply",
  "getTokenAccountBalance",
  "getTokenAccountsByDelegate",
  "getTokenAccountsByOwner",
  "getTokenLargestAccounts",
  "getTokenSupply",
  "getTransaction",
  "getTransactionCount",
  "getVersion",
  "getVoteAccounts",
  "minimumLedgerSlot",
  "requestAirdrop",
  "sendTransaction",
  "simulateTransaction",
];
