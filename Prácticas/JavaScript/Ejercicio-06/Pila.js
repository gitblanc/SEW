class Pila {
    //constructor
    constructor(){
        this.data = [];
        this.last = -1;
    }
    //función push
    pushMyPila(element) {
        this.data.push(element);
        this.last += 1;
    }
    //función pop
    popMyPila(){
        if(!this.isEmpty()){
            this.last -= 1;
            return this.data.pop();
        }
    }
    //función que vacía la pila
    empty(){
        let i = 0;
        for(i = 0; i<this.size();i++){
            this.data.pop();
        }
        this.last = -1;
    }
    //función isEmpty
    isEmpty(){
        return this.last < 0;
    }
    //función que imprime la pila
    show(s)
    {
        var aux = [];
        let str = "";
        // If stack is empty then return
        if (s.size() == 0)
            return;
        
        let i = 0;
        var elem;
        for(i = this.size(); i > 0;i--){
            elem = this.data.pop();
            str += "("+ i +": \t\t" + elem +")\n";
            aux.push(elem);
        }
        for(i = 0; i<this.size();i++){
            elem = aux.pop();
            this.data.push(elem);
        }
        return str;
    }
    //función get element
    get(x){
        if(x >= this.size()-1){
            return this.data[x];
        }
    }
    //función que devuelve el tamaño de la pila
    size(){
        return this.last+1;
    }
}