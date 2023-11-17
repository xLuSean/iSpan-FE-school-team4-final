import regression from 'regression';

const nutritionRegression = (calories) => {
  // >>>>>>>>>>>>>>> data
  const caloriesData = [1200, 1500, 1800, 2000, 2200, 2500, 2700];
  const grandsUnrefined = [1, 1, 1, 1, 1.5, 1.5, 1.5]; //未精緻穀物
  const grandElse = [0.5, 1.5, 2, 2, 2, 2.5, 2.5]; //其他穀物
  const beanFishEggMeat = [3, 4, 5, 6, 6, 7, 8]; //豆蛋魚肉
  const dairy = [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 2]; //乳品
  const vegetable = [3, 3, 3, 4, 4, 5, 5]; //蔬菜
  const fruits = [2, 2, 2, 3, 3.5, 4, 4]; //水果
  const oil = [3, 3, 4, 5, 5, 6, 7]; //油脂類
  const nuts = [1, 1, 1, 1, 1, 1, 1]; //種子
  // <<<<<<<<<<<<<< data
  const GNresult = logRegression(caloriesData, grandsUnrefined, calories);
  const GEresult = logRegression(caloriesData, grandElse, calories);
  const BFEMresult = logRegression(caloriesData, beanFishEggMeat, calories);
  const dairyResult = logRegression(caloriesData, dairy, calories);
  const vegetableResult = logRegression(caloriesData, vegetable, calories);
  const fruitResult = logRegression(caloriesData, fruits, calories);
  const oilResult = logRegression(caloriesData, oil, calories);
  const nutsResult = logRegression(caloriesData, nuts, calories);

  const nutrition = {
    grains: {
      total: Number(Number(GNresult) + Number(GEresult)).toFixed(1),
      unrefined: GNresult,
      else: GEresult,
    },
    beanFishEggMeat: BFEMresult,
    dairy: dairyResult,
    vegetable: vegetableResult,
    fruits: fruitResult,
    oilNuts: {
      total: Number(Number(oilResult) + Number(nutsResult)).toFixed(1),
      oil: oilResult,
      nuts: nutsResult,
    },
  };

  return nutrition;
};

const combineXY = (x, y) => {
  return x.map((vx, i) => {
    return [vx, y[i]];
  });
};

const logRegression = (x, y, input) => {
  const dataXY = combineXY(x, y);
  const dataLog = regression.logarithmic(dataXY);
  const result = dataLog.equation[0] + dataLog.equation[1] * Math.log(input);
  return Number(result).toFixed(1);
};

const nutritionTable = (calories) => {
  let nutrition;
  if (calories <= 1200) {
    nutrition = {
      grains: { unrefined: 1, else: 0.5 },
      beanFishEggMeat: 3,
      dairy: 1.5,
      vegetable: 3,
      fruits: 2,
      oilNuts: { oil: 3, nuts: 1 },
    };
  } else if (calories > 1200 && calories <= 1500) {
    nutrition = {
      grains: { unrefined: 1, else: 1.5 },
      beanFishEggMeat: 4,
      dairy: 1.5,
      vegetable: 3,
      fruits: 2,
      oilNuts: { oil: 3, nuts: 1 },
    };
  } else if (calories > 1500 && calories <= 1800) {
    nutrition = {
      grains: { unrefined: 1, else: 2 },
      beanFishEggMeat: 5,
      dairy: 1.5,
      vegetable: 3,
      fruits: 2,
      oilNuts: { oil: 4, nuts: 1 },
    };
  } else if (calories > 1800 && calories <= 2000) {
    nutrition = {
      grains: { unrefined: 1, else: 2 },
      beanFishEggMeat: 6,
      dairy: 1.5,
      vegetable: 4,
      fruits: 3,
      oilNuts: { oil: 5, nuts: 1 },
    };
  } else if (calories > 2000 && calories <= 2200) {
    nutrition = {
      grains: { unrefined: 1.5, else: 2 },
      beanFishEggMeat: 6,
      dairy: 1.5,
      vegetable: 4,
      fruits: 3.5,
      oilNuts: { oil: 5, nuts: 1 },
    };
  } else if (calories > 2200 && calories <= 2500) {
    nutrition = {
      grains: { unrefined: 1.5, else: 2.5 },
      beanFishEggMeat: 7,
      dairy: 1.5,
      vegetable: 5,
      fruits: 4,
      oilNuts: { oil: 6, nuts: 1 },
    };
  } else {
    nutrition = {
      grains: { unrefined: 1.5, else: 2.5 },
      beanFishEggMeat: 7,
      dairy: 1.5,
      vegetable: 5,
      fruits: 4,
      oilNuts: { oil: 6, nuts: 1 },
    };
  }

  return nutrition;
};

export { nutritionTable, nutritionRegression };
