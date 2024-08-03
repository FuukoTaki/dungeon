export const coinResults = {
    NORMAL: "normal",
    BUFF: "buff",
    DEBUFF: "debuff",

    TAILS: "tails",
    HEADS: "heads"
};

export function tossACoin() {

    let coinFlip = Math.floor(Math.random() * 2);
    return (coinFlip === 0) ? coinResults.TAILS : coinResults.HEADS;
}

export function tossTwoCoins() {

    let coin1 = tossACoin();
    let coin2 = tossACoin();

    if (coin1 === coinResults.TAILS && coin2 === coinResults.TAILS)
        return coinResults.BUFF;
    if (coin1 === coinResults.HEADS && coin2 === coinResults.HEADS)
        return coinResults.DEBUFF;

    return coinResults.NORMAL;
}