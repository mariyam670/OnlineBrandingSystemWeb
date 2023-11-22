export interface IUpsertSite{
    SiteId :number,
    SiteTitle :string , 
    SiteKeyword :string;  
    SiteDescription:string; 
    SiteUrl:string,
    SiteEmail:string,
    SiteImage:File,
    ChangeBy :number,  
    CreatedBy:number
}