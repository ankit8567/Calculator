const display = document.getElementById("display");
const history = document.getElementById("history");


// Add value to display
function addValue(value) {

    if (display.value === "0" || display.value === "Error") {
        display.value = "";
    }

    display.value += value;
}


// Clear calculator
function clearDisplay() {

    display.value = "0";

    history.textContent = "";
}


// Delete last character
function deleteLast() {

    if (
        display.value.length === 1 ||
        display.value === "Error"
    ) {
        display.value = "0";
        return;
    }

    display.value = display.value.slice(0, -1);
}


// Calculate result
function calculate() {

    let expression = display.value;

    if (
        expression === "" ||
        expression === "0"
    ) {
        return;
    }

    try {

        // Show previous calculation
        history.textContent = expression + " =";

        // Calculate result
        let result = eval(expression);

        // Check for invalid result
        if (!isFinite(result)) {
            display.value = "Error";
            return;
        }

        // Remove unnecessary decimal zeros
        if (Number.isInteger(result)) {
            display.value = result;
        } else {
            display.value = parseFloat(result.toFixed(10));
        }

    } catch (error) {

        display.value = "Error";
    }
}


// Keyboard support
document.addEventListener("keydown", function(event) {

    const key = event.key;


    // Numbers
    if (key >= "0" && key <= "9") {

        addValue(key);

    }


    // Operators
    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%" ||
        key === "."
    ) {

        addValue(key);

    }


    // Enter
    else if (key === "Enter") {

        event.preventDefault();

        calculate();

    }


    // Backspace
    else if (key === "Backspace") {

        deleteLast();

    }


    // Escape
    else if (key === "Escape") {

        clearDisplay();

    }

});