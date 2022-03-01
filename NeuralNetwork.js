class NeuralNetwork {
    constructor(structure) {
        this.nodes = [];
        this.weights = [];

        // initialize nodes based on structure
        for (let i = 0; i < structure.length; i++) {
            this.nodes.push([]);
            for (let n = 0; n < structure[i]; n++) {
                this.nodes[i].push(new Node());
            }
        }

        // initialize weights based on structure
        for (let i = 0; i < this.nodes.length - 1; i++) {
            this.weights.push([]);
            for (let j = 0; j < this.nodes[i + 1].length; j++) {
                this.weights[i].push([]);
                for (let n = 0; n < this.nodes[i].length; n++) {
                    this.weights[i][j].push(random(-1, 1));
                }
            }
        }
    }

    feedForward(inputs) {
        for (let layer = 0; layer < this.nodes.length; layer++) {
            for (let node = 0; node < this.nodes[layer].length; node++) {
                if (layer === 0) {
                    this.nodes[layer][node].feedForward([inputs[node]]);
                } else {
                    this.nodes[layer][node].feedForward(
                        this.nodes[layer - 1],
                        this.weights[layer - 1][node]
                    );
                }
            }
        }
    }

    output() {
        let out = [];
        for (let n of this.nodes[this.nodes.length - 1]) {
            out.push(n.output);
        }
        return out;
    }
}