
// Capitalize First Letter in Each Word
function toTitleCase(str)
{
    return str.toString().replace(/\w\S*/g, function(txt){return txt.charAt(0).toString().toUpperCase() + txt.substr(1).toString().toLowerCase();});
}
