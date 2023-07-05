// import createStatementData from "./createStatementData"
const data = require("./createStatementData.js")

const playsJson = {
  "hamlet": {
    "name": "Hamlet",
    "type": "tragedy",
  },
  "as-like": {
    "name": "As You Lie It",
    "type": "comedy",
  },
  "othello": {
    "name": "Othello",
    "type": "tragedy"
  }
}

const invoicesJson = {
  "customer": "BigCo",
  "performances": [
    {
      "playID": "hamlet",
      "audience": 55,
    },
    {
      "playID": "as-like",
      "audience": 35,
    },
    {
      "playID": "othello",
      "audience": 40,
    },
  ]
}

const answer = `청구 내역 (고객명 : BigCo)
 Hamlet: $650.00 (55석)
 As You Lie It: $475.00 (35석)
 Othello: $500.00 (40석)
총액: $1,625.00
적립포인트: 47점
`

function statement(invoice, plays) {
  return renderPlainText(data.createStatementData(invoice, plays)) 
  // return renderHTML(createStatementData(invoice, plays))
}

function renderPlainText(data) {
  let result = `청구 내역 (고객명 : ${data.customer})\n`;

  for (let perf of data.performances) {
    // 청구 내역 출력
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
  }

  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립포인트: ${data.totalVolumeCredits}점\n`;
  return result;

}

function renderHTML(data) {
  // render with HTML
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", 
    {style: "currency", currency: "USD", minimumFractionDigits: 2}).format(aNumber/100); 
}

console.log(statement(invoicesJson, playsJson));
console.log(answer === statement(invoicesJson, playsJson));