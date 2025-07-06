import  moment from 'moment-timezone'



export default class Timezone{
    /* private now:Date = new Date()
    private currentTime:string = `${this.now.getHours()}:${this.now.getMinutes()}:${this.now.getSeconds()}`
    private timeParts:string[] = this.currentTime.split(':')
    public hours:number = parseInt(this.timeParts[0]) */
    

    invertDate = (date:string)=>{
        //if (!date) return null

        // Try parsing the date assuming it's in 'DD/MM/YYYY' format
        const ddmmYYYYDate = moment(date, 'DD/MM/YYYY', true)

        // If parsing succeeds, return the date directly
        if (ddmmYYYYDate.isValid()) return date
        
        const washingtonTimezone = 'America/New_York'
        const brazilTimezone = 'America/Bahia'

        // Convert the date from 'M/D/YYYY' format to Brazil timezone
        const brazilDate = moment.tz(date, 'M/D/YYYY', washingtonTimezone).tz(brazilTimezone)
        
        const formattedBrazilDate = brazilDate && brazilDate.format('DD/MM/YYYY') //: null
        
        return formattedBrazilDate           
    }


    returnToLocalDate = (currentMoment:string)=>{
        const extractedDate = currentMoment.split('-')[0]
        const currentLocalDate = this.invertDate(extractedDate)
        
        return currentLocalDate
    }
}