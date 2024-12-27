const inputField = document.getElementById("css-input");
const outputField = document.getElementById("formatted-output");
const errorMessage = document.getElementById("error-message");
const indentationSelector = document.getElementById("indentation");

inputField.addEventListener("input", formatCss);
indentationSelector.addEventListener("change", formatCss);

function formatCss() {
    const input = inputField.value;
    const indentation = parseInt(indentationSelector.value);
    const indent = " ".repeat(indentation);

    try {
        const formattedCss = beautifyCss(input, indent);
        outputField.innerHTML = `<pre>${formattedCss}</pre>`;
        errorMessage.textContent = "";
    } catch (error) {
        outputField.textContent = "";
        errorMessage.textContent = "Error: Unable to format CSS.";
    }
}

function beautifyCss(css, indent) {
  return css
    .replace(/([{}])/g, "\n$1\n")
    .replace(/;/g, ";\n")
    .replace(/\s*\n\s*/g, "\n")
    .split("\n")
    .map((line) => {
      if (line.includes("{")) return line.trim();
      if (line.includes("}")) return line.trim();
      return `${indent}${line.trim()}`;
    })
    .join("\n")
    .replace(/\n+/g, "\n");
}