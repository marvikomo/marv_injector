import { Injector } from "./injector";

export class Log{
    test(){
        console.log("test");
    }
}

export class Hey{
    output(){
        console.log("working");
    }
}

@Injector()
export class Test{
    constructor(private log?: Log, private hey?: Hey){
       
    }

    test(){
        this.log.test();
    }
    output(){
        this.hey.output();
    }
}

new Test().output();
new Test().test();