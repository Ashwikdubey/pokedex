export function debounce(cb,delay=1000){
    let timerID;
    return (...args)=>{
        clearTimeout(timerID)
        timerID=setTimeout(()=>{
            cb(...args)
        },delay)
    }
}