import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "arrayFilter"
})

export class SearchRecordsPipe implements PipeTransform {

    transform(value:any[],searchString:string ){

       if(!searchString){
        //  console.log('no search')
         return value  
       }

       return value.filter(it=>{   
           const builderId = it.procedureType.toString().includes(searchString) 
           const groupName = it.conditionCategory.toLowerCase().includes(searchString.toLowerCase())
           const companyPersonName = it.consultingDocName.toLowerCase().includes(searchString.toLowerCase())
      
           return (builderId + groupName + companyPersonName);      
       }) 
    }
}