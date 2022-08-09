import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "filterDept"
})

export class SearchDeptPipe implements PipeTransform {

    transform(value:any[],searchString:string ){
       if(!searchString){
        //  console.log('no search')
         return value  
       }

       return value.filter(it=>{   
           const builderId = it.name.toString().includes(searchString) 
           return (builderId );      
       }) 
    }
}