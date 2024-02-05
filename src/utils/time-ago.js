export function timeAgo(date) {
    const seconds = 1;
    const minute = seconds * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    let now = new Date()
    let timeresult = new Date(date.replaceAll("T"," ").substr(0,18))
    let timecalc = Math.trunc((now.getTime() - timeresult.getTime()) / 1000);
    let elapsedText = "";
    let checkLastText = "";
    if (timecalc < seconds) {
        elapsedText = "방금 전";
    } else if (timecalc < minute) {
        elapsedText = timecalc + "초 전";
    } else if (timecalc < hour) {
        elapsedText = Math.trunc(timecalc / minute) + "분 전";
    } else if (timecalc < day) {
        elapsedText = Math.trunc(timecalc / hour) + "시간 전";
    } else if (timecalc < (day * 15)) {
        elapsedText = Math.trunc(timecalc / day) + "일 전";
    } else {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        elapsedText =  timeresult.toLocaleDateString('ko-KR', options).replace(/\//g, '.');
    }
    checkLastText = elapsedText.replace(/\.$/, '');
    
    return checkLastText;
}