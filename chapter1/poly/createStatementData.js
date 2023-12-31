function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case "tragedy": return new TragedyCalculator(aPerformance, aPlay)
    case "comedy": return new ComedyCalculator(aPerformance, aPlay)
    default:
      throw new Error("알 수 없는 장르")
  }
}
class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance
    this.play = aPlay
  }

  get amount() {
    throw new Error("abstract method")
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount () {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    } 
    return result
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}

function createStatementData(invoice, plays) {
  const statementData = {}
  statementData.customer = invoice.customer
  statementData.performances = invoice.performances.map(enrichPerformance)
  statementData.totalAmount = totalAmount(statementData)
  statementData.totalVolumeCredits = totalVolumeCredits(statementData)
  return statementData

  function enrichPerformance(aPerformance) {
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance))
    const result = Object.assign({}, aPerformance) // 얕은 복사
    result.play = calculator.play
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits
    return result
  }
  
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  } 

  function totalAmount(data) {
    return data.performances.reduce((total, perf) => total + perf.amount, 0)
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, perf) => total + perf.volumeCredits, 0)
  }
}

module.exports = {
  createStatementData
}