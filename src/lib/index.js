/*
import 'whatwg-fetch'

export async function getRate() {
  const response = await fetch('http://api.fixer.io/latest')

  return await response.json()
}
*/

function primeFactorization(num) {
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
  const ratios = []
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      ratios.push(findExactRatio(Math.round(num1 * 100) + i, Math.round(num2 * 100) + j))
    }
  }
  return getSimplestRatio(ratios)
}

export const currencyNames = {
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  EUR: 'Euro',
  GBP: 'British Pound',
  HKD: 'Hong Kong Dollar',
  HRK: 'Croatian Kuna',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  USD: 'United States Dollar',
  ZAR: 'South African Rand'
}
