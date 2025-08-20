export function trimLastWord(location:string) {
    let words = location?.split(" ");
    words?.pop();
    return words?.join(" ");
}