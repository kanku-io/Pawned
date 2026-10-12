const zar = new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" });

export const formatZAR = (cents) => zar.format((cents ?? 0) / 100);