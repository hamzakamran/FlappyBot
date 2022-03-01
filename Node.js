class Node {
    constructor() {
        this.output;
    }

    feedForward(inputs, weights = []) {
        if (inputs.length === 1) {
            this.output = inputs[0];
        } else {
            if (inputs.length !== weights.length) {
                console.error("Error: inputs and weights length must be equal.");
                this.output = -1;
            }
            let sum = 0;
            for (let i = 0; i < inputs.length; i++) {
                sum += inputs[i].output * weights[i];
            }
            this.output = sigmoid(sum);
        }
    }
}

function sigmoid(x) {
    return 1 / (1 + Math.pow(Math.E, -x));
}