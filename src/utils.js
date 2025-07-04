export function getData(data, parent, child) {
  function findRepeated(parent, child, results) {
    if (child in results[parent]) {
      results[parent][child] += 1
    } else {
      results[parent][child] = 1
    }
    return results
  }

  function extractStatistics(data, objKey) {
    let statistics = {}

    for (let key in data) {
      statistics[key] = []
      for (let childkey in data[key]) {
        let tempdata = { [objKey]: childkey, value: data[key][childkey] }
        statistics[key].push(tempdata)
      }
    }
    return statistics
  }
  let states = {}

  for (let obj of data) {
    if (!states.hasOwnProperty(obj[parent])) {
      states[obj[parent]] = {}
      states = findRepeated(obj[parent], obj[child], states)
    } else {
      states = findRepeated(obj[parent], obj[child], states)
    }
  }

  let finaldata = extractStatistics(states, child)

  return finaldata
}

export function capitalizeWords(string) {
  return string.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase()
  })
}

export function getPieData(data, valueData) {
  const chartData = data.reduce((carry, item) => {
    const { product, [valueData]: req } = item

    if (!(product in carry)) {
      carry[product] = 0
    }

    carry[product] += parseFloat(req)

    return carry
  }, {})

  const finalData = [...Object.entries(chartData)]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map((entry) => ({
      name: entry[0],
      value: entry[1],
    }))
  return finalData
}

