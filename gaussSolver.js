// An algorithm to solve systems of equations.

let A = [];


Array.prototype.parse = function() {
    let arr = [];
    this.map((element) => {
        arr.push(parseInt(element)); 
    })
    return arr
}

A[0] = ('2 1 -1'.split(' ')).parse();
A[1] = ('1 2 1'.split(' ')).parse();
A[2] = ('1 1 1'.split(' ')).parse();
const b = ('-3 3 2'.split(' ')).parse();

function gaussSolver(A, b){
    let i, j, k, l, m;
    //ETAPA DE ESCALONAMENTO
    for(k = 0; k < A.length - 1; k++){
        //procura o maior k-ésimo coeficiente em módulo
        let max = Math.abs(A[k][k]);
        let maxIndex = k;
        for(i = k + 1; i < A.length; i++){
            if(max < Math.abs(A[i][k])){
                max = Math.abs(A[i][k]);
                maxIndex = i;
            }
        }
        if(maxIndex != k){
            /*
             troca a equação k pela equação com o
             maior k-ésimo coeficiente em módulo
             */
            for(j = 0; j < A.length; j++){
                let temp = A[k][j];
                A[k][j] = A[maxIndex][j];
                A[maxIndex][j] = temp;
            }
            let temp = b[k];
            b[k] = b[maxIndex];
            b[maxIndex] = temp;
        }
        //Se A[k][k] é zero, então a matriz dos coeficiente é singular
        //det A = 0
        if(A[k][k] == 0){
            return null;
        }else{
            //realiza o escalonamento
            for(m = k + 1; m < A.length; m++){
                let F = -A[m][k] / A[k][k];
                A[m][k] = 0; //evita uma iteração
                b[m] = b[m] + F * b[k];
                for(l = k + 1; l < A.length; l++){
                    A[m][l] = A[m][l] + F * A[k][l];
                }
            }
        }
    }
    //ETAPA DE RESOLUÇÃO DO SISTEMA
    let X = [];
    for(i = A.length - 1; i >= 0; i--){
        X[i] = b[i];
        for(j = i + 1; j < A.length; j++){
            X[i] = X[i] - X[j] * A[i][j];
        }
        X[i] = X[i] / A[i][i];
    }
    return X;
}
const x = gaussSolver(A, b);
console.log(`x1 = ${x[0].toFixed(2)}, x2 = ${x[1].toFixed(2)}, x3 = ${x[2].toFixed(2)}`);