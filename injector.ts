import 'reflect-metadata';
import {getParamInfo} from "./reflection-helper"
import constructor from "./types/constructor";
import {instance as ioc_conntainer} from "./ioc-container";
export function Injector(): Function{
    return (target: constructor<any>)=>{
        let paramInfo = getParamInfo(target);
        return class extends target{
            constructor(...args: any[]){
              console.log(args)
                super(
                    ...args.concat(
                        paramInfo.slice(args.length).map((type, index)=>{
                            console.log(type);
                            try{
                                return ioc_conntainer.resolve(type);
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

export function isTransformDescriptor(
    descriptor: any
  ): descriptor is TransformDescriptor {
    return (
      typeof descriptor === "object" &&
      "token" in descriptor &&
      "transform" in descriptor
    );
  }

  export interface TransformDescriptor {
    token: InjectionToken<any>;
    transform: InjectionToken<Transform<any, any>>;
    transformArgs: any[];
  }

  interface Transform<TIn, TOut> {
    transform: (incoming: TIn, ...args: any[]) => TOut;
  }
  export interface TokenDescriptor {
    token: InjectionToken<any>;
    multiple: boolean;
  }

  type InjectionToken<T = any> =
  | constructor<T>
  | string
  | symbol
  | DelayedConstructor<T>;


  export class DelayedConstructor<T> {
    private reflectMethods: ReadonlyArray<keyof ProxyHandler<any>> = [
      "get",
      "getPrototypeOf",
      "setPrototypeOf",
      "getOwnPropertyDescriptor",
      "defineProperty",
      "has",
      "set",
      "deleteProperty",
      "apply",
      "construct",
      "ownKeys"
    ];
  
    constructor(private wrap: () => constructor<T>) {}
  
    public createProxy(createObject: (ctor: constructor<T>) => T): T {
      const target: object = {};
      let init = false;
      let value: T;
      const delayedObject: () => T = (): T => {
        if (!init) {
          value = createObject(this.wrap());
          init = true;
        }
        return value;
      };
      return new Proxy<any>(target, this.createHandler(delayedObject)) as T;
    }
  
    private createHandler(delayedObject: () => T): ProxyHandler<object> {
      const handler: ProxyHandler<object> = {};
      const install = (name: keyof ProxyHandler<any>): void => {
        handler[name] = (...args: any[]) => {
          args[0] = delayedObject();
          const method = Reflect[name];
          return (method as any)(...args);
        };
      };
      this.reflectMethods.forEach(install);
      return handler;
    }
  }