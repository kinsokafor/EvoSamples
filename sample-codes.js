export const toLocale = (str, prefix = "", suffix = "") => {
    if(str == "" || str == undefined) str = 0;

    function ordinaryString() {
        var parts = (Math.round(str * 100) / 100).toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return prefix+parts.join(".")+suffix;
    }

    if(prefix != "" || suffix != "") return ordinaryString();
    
    str = parseFloat(str);
    return str.toLocaleString("en-NG", {
        style:"currency", 
        currency:"NGN"
    })
} 