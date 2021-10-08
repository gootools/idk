import App from "./App";

test("app", () => {
  const app = App.create({});
  app.addWallet(
    "end chimney lumber waste come sand act flock alley crime axis pledge"
  );
  expect(app.activeWallet?.accounts.length).toEqual(1);
  expect(app.activeWallet?.activeAccount.pubkey).toEqual(
    "BWEXqueud7iFv9z1fVJ8gD4MBQY7EBz8FRReC6Rvhx3W"
  );
  app.activeWallet?.addAccount();
  app.activeWallet?.addAccount();
  expect(app.activeWallet?.accounts.length).toEqual(3);
  expect(app.activeWallet?.accounts.map(({ pubkey }) => pubkey)).toEqual([
    "BWEXqueud7iFv9z1fVJ8gD4MBQY7EBz8FRReC6Rvhx3W",
    "R3GGCC3FVu9oaGycz6JunAxyDnKmcKeMnC92dKqmBbh",
    "98bHEQty5wKos44sCkdma9TKBsZyZ21LJxkSe6Q2fP21",
  ]);
});
