import App from "./App";

test("add wallet", async () => {
  const store = App.create();
  expect(store.wallets.length).toEqual(0);
  const key = "BXok7a7ziwJpALEZH4w4hViYULHCCudSwVuaoRmg7TRQ";
  await store.addAccount(key);
  expect(store.wallets[0].pubkey).toEqual(key);
});

test("add invalid wallet", (done) => {
  const store = App.create();
  store.addAccount("foo").catch((e) => {
    expect(e).toEqual("invalid pubkey");
    expect(store.wallets.length).toEqual(0);
    done();
  });
});
