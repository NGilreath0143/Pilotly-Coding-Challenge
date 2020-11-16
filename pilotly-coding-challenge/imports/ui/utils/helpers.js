export const encodeHTML= (string) => {
    string = string.replace(/&/g, "&#38;");
    string = string.replace(/</g, "&#60;");
    string = string.replace(/>/g, "&#62");
    string = string.replace(/"/g, "&#34");
    string = string.replace(/'/g, "&#39;");
    string = string.replace(/\//g, "&#x2F;");
    return string;
}