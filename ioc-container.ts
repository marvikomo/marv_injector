export class ioc_container{

    public constructor(private parent?: ioc_container) {}
    public resolve<T>(
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

export const instance: ioc_container = new ioc_container();
export default instance;