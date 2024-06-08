
import {formatDistanceToNowStrict} from 'date-fns'

export const formateMoney=(amount:string)=>{
    const money=Number(amount)
    return new Intl.NumberFormat('en-BD',{
        style:'currency',
        currency:'BDT'
    }).format(money)
}


export const formateDate=(from:Date)=>{
    return formatDistanceToNowStrict(from,{addSuffix:true})
};


export const dateFormat = (inputDate: string) => {
    const date = new Date(inputDate);
    const options :any = { month: "long" as const, day: "numeric", year: "numeric" as const };
    const formattedDate = date.toLocaleDateString("en-US", options  );
    return formattedDate;
  };




  
  
  

