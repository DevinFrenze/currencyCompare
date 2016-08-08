import _ from 'lodash'
const primeFactorizations = {}

function primeFactorization(num) {
  if (primeFactorizations[num])
    return _.clone(primeFactorizations[num])

  const results = { 1: num }
  let n = num
  for (var i = 2; i < Math.sqrt(num); i++) {
    while (n % i === 0) {
      if (!results[i]) results[i] = 0
      results[i]++
      n /= i
    }
  }
  results[n] = 1
  primeFactorizations[num] = _.clone(results)
  return results
}

function simplifyFactors(aFactors, bFactors) {
  const aKeys = Object.keys(aFactors)
  for (var i = 0; i < aKeys.length; i++) {
    let key = aKeys[i]
    while (aFactors[key] > 0 && bFactors[key] > 0) {
      aFactors[key]--
      bFactors[key]--
    }
  }
}

function numberFromFactors(factors) {
  const aKeys = Object.keys(factors)
  let num = 1
  for (var i = 0; i < aKeys.length; i++) {
    let key = aKeys[i]
    while (factors[key] > 0) {
      num *= key
      factors[key]--
    }
  }
  return num
}

function findExactRatio(a, b) {
  let aFactors = primeFactorization(a), bFactors = primeFactorization(b)
  simplifyFactors(aFactors, bFactors)
  const result = [
    numberFromFactors(aFactors),
    numberFromFactors(bFactors)
  ]
  return result
}

function getSimplestRatio(ratios) {
  let simplest = ratios[0]
  for (let i = 1; i < ratios.length; i++) {
    if (ratios[i][0] + ratios[i][1] < simplest[0] + simplest[1]) {
      simplest = ratios[i]
    }
  }
  return simplest
}

export function findRatio(num1, num2) {
  console.log(num2)
  if (num2 > 100) return [ 1, Math.floor(num2) ]

  const ratios = []
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      ratios.push(findExactRatio(Math.round(num1 * 100) + i, Math.round(num2 * 100) + j))
    }
  }
  return getSimplestRatio(ratios)
}
