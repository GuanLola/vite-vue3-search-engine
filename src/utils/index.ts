const formatCount = (e: any) => {
  return e
    ? e >= 1e4 && e < 1e8
      ? parseFloat(Number(e / 1e4).toFixed(1)) + "万"
      : e >= 1e8
      ? parseFloat(Number(e / 1e8).toFixed(1)) + "亿"
      : e.toString()
    : "0";
};

export { formatCount };
