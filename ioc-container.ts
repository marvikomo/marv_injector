export class ioc_container{
    public constructor(private parent?: ioc_container) {}
    private _dependencies: {[key: string]: Object} = {};
    public resolve<T>(
        token:any
      ): T {
        if(!this._dependencies[token]){
          return new token();
        }  
        return this._dependencies[token] as  T
      }
    public register(token:any, dependencies: string[]){
      let dependenciesImplementations: any = this.getDependenciesImplementations(dependencies);
      this._dependencies[token] = new token(...dependenciesImplementations);

    }
    private getDependenciesImplementations(token: any){
      return this.resolve(token);
    }
    

}

export const instance: ioc_container = new ioc_container();
export default instance;