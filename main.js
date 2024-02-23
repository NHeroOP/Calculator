const result = document.querySelector(".result")
const numKeys = document.querySelectorAll(".numKey")
const opKeys = document.querySelectorAll(".operator")
const delBtn = document.querySelector(".del")
const resetBtn = document.querySelector(".reset")
const equalsBtn = document.querySelector(".equals")

let operator;

numKeys.forEach((numKey) => {
  numKey.addEventListener("click", (e) => {
    if(result.textContent.length == 1 && result.textContent == "0"){
      result.textContent = numKey.textContent
    } else {
      result.textContent += numKey.textContent
    }
  })
})

delBtn.addEventListener("click", (e) => {
  if (result.textContent.length <= 1) {
    result.textContent = "0"
  }
  else {
    result.textContent = result.textContent.slice(0, -1)
  }
})

resetBtn.addEventListener("click", (e) => {
  result.textContent = "0"
})

opKeys.forEach((op) => {
  op.addEventListener("click", (e) => {
    if (operator) return;
    operator = op.textContent
    result.textContent += ` ${op.textContent} `
  })
})

function calc(operator, n1, n2) {
  n1 = Number(n1)
  n2 = Number(n2)

  if(operator == "+") {
    return n1 + n2
  }
  else if(operator == "-") {
    return n1 - n2
  }
  else if(operator == "x") {
    return n1 * n2
  }
  else if(operator == "/") {
    return n1 / n2
  }
}


equalsBtn.addEventListener("click", (e) => {
  if(!operator) return;

  const [n1, n2] = result.textContent.split(` ${operator} `)
  const ans = calc(operator, n1, n2)
  result.textContent = Math.round((ans + Number.EPSILON) * 100) / 100
  console.log(result.textContent);

  operator = undefined
})