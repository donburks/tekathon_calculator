var screen = document.querySelector("#calculator p");
var memory = [];
var op = [];
var start = true;
var clickHandlers = {
  flash: function() {
    var btn = this;
    btn.style.backgroundColor = 'black';
    btn.style.color = 'lightgrey';
    setTimeout(function() {
      btn.style.backgroundColor = 'lightgrey';
      btn.style.color = 'black';
    }, 100);
  },
  numberClick: function() {
    if (this.innerText == ".") {
      if (this.classList.contains("clicked")) {
        return false;
      } else {
        this.classList.add("clicked");
      }
    }
    if ((screen.innerText == "0" || start) && this.innerText !== ".") {
      screen.innerText = this.innerText;
    } else {
      screen.innerText += this.innerText;
    }
    start = false;
  },
  negClick: function() {
    screen.innerText = Number(screen.innerText) * -1;
  },
  clrClick: function() {
    screen.innerText = "0";
    reset();
  },
  opClick: function() {
    memory.push(Number(screen.innerText));
    op.push(this.getAttribute("data-op"));
    screen.innerText = "0";
    resetClicked();
  },
  equalsClick: function() {
    memory.push(Number(screen.innerText));

    var num1 = memory.shift();
    var total = memory.reduce(function(subtotal, num, index) {
      switch(op[index]) {
        case "add":
          total = subtotal + num;
          break;
        case "sub":
          total = subtotal - num;
          break;
        case "mul":
          total = subtotal * num;
          break;
        case "div":
          total = subtotal / num;
          break;
      }
      return total;
    }, num1);

    screen.innerText = total;
    reset();
  }
};

function reset() {
  memory = [];
  op = [];
  start = true;
  resetClicked();
}

function resetClicked() {
  document.querySelector(".clicked").classList.remove("clicked");
}

document.querySelectorAll("button").forEach(function(btn) {
  btn.addEventListener('click', clickHandlers.flash);
});

document.querySelectorAll("button.number").forEach(function(btn) {
  btn.addEventListener('click', clickHandlers.numberClick);
});

document.querySelector("#neg").addEventListener('click', clickHandlers.negClick);

document.querySelector("#clr-button").addEventListener('click', clickHandlers.clrClick);

document.querySelectorAll("button.op").forEach(function(btn) {
  btn.addEventListener('click', clickHandlers.opClick);
});

document.querySelector("#equals").addEventListener('click', clickHandlers.equalsClick);
