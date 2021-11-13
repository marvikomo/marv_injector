export class Ioc_container{
    public static _instance: Ioc_container = new Ioc_container();
    public constructor() {
      if(Ioc_container._instance){
        throw new Error("cannot instantiate class using new")
      }
    }
    public static get instance():Ioc_container{
      return Ioc_container._instance;
    } 
    public static resolve<T>(
        token:any,
        context: ResolutionContext = new ResolutionContext()
      ): T {    
        return new token(); 
      }

}

export  class ResolutionContext {
    scopedResolutions: Map<Registration, any> = new Map();
  }

  export type Registration<T = any> = {
    provider: any;
    options: any;
    instance?: T;
  };

export default Ioc_container;