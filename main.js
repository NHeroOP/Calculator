const result = document.querySelector(".result")
const numKeys = document.querySelectorAll(".numKey")
const opKeys = document.querySelectorAll(".operator")
const delBtn = document.querySelector(".del")
const resetBtn = document.querySelector(".reset")
const equalsBtn = document.querySelector(".equals")
const colorThemes = document.querySelectorAll("[name='theme']")

let operator;

// Local Storage
const storeTheme = (theme) => {
  localStorage.setItem("theme", theme)
}

const setTheme = () => {
  const activeTheme = localStorage.getItem("theme");
  colorThemes.forEach((themeOption) => {
    if (themeOption.id === activeTheme) {
      themeOption.checked = true;
    }
  });

  document.documentElement.className = activeTheme
}

colorThemes.forEach((themeOption) => {
  themeOption.addEventListener("click", () => {
    storeTheme(themeOption.id);

    document.documentElement.className = themeOption.id
  })
})

document.onload = setTheme()


// Calculator
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
  result.textContent = ans;

  operator = undefined
})