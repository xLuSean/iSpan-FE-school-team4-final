const defalutParams = {
  scale: 2,
  rotate: 0,
  brickColor: 'hsla(100, 0%, 30%, 1)',
  strokeWidth: 1.5,
  strokeColor: 'hsla(100, 0%, 20%, 1)',
};

const getBrickBackground = (parameters) => {
  typeof parameters === 'object'
    ? Object.keys(parameters).forEach(
        (key) => parameters[key] === undefined && delete parameters[key]
      )
    : (parameters = {});

  const { scale, rotate, brickColor, strokeWidth, strokeColor } = {
    ...defalutParams,
    ...parameters,
  };

  return `url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='30' height='30' patternTransform='scale(${scale}) rotate(${rotate})'><rect x='0' y='0' width='100%' height='100%' fill='${brickColor}'/><path d='M0 22.5h30v15H0zm15-15h30v15H15m-30-15h30v15h-30zm15-15h30v15H0z'  stroke-width='${strokeWidth}' stroke='${strokeColor}' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,-14)' fill='url(%23a)'/></svg>")`;
};

export default getBrickBackground;
