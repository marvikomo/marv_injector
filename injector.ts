import 'reflect-metadata';
import {getParamInfo} from "./reflection-helper"
import constructor from "./types/constructor";
import Ioc_container from "./ioc-container";
export function Injector(): Function{
    return (target: constructor<any>)=>{
        let paramInfo = getParamInfo(target);
        return class extends target{
            constructor(...args: any[]){
                super(
                    ...args.concat(
                        paramInfo.slice(args.length).map((type, index)=>{
                            try{
                              if(isConstructorArgs(type)){
                                return Ioc_container.resolve(type);
                              }else{
                                throw new Error("must be of type object");
                              }
                            }catch(err){
                               console.log(err)
                            }
                        })
                    )
                )
            }

        }
    }
}

function  isConstructorArgs(value:any){
  return typeof value === "function";
}