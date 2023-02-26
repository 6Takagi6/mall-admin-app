import Cookies from "js-cookie";
export function setUserCookies(userInfo) {
    const arr = Object.entries(userInfo);//对象转为数组
    for (let i = 0; i < arr.length; i += 1) {
        Cookies.set(arr[i][0], arr[i][1]);
    }
    return true;
}
export function getUserCookies() {
    return {
        username: Cookies.get('username'),
        appkey: Cookies.get('appkey'),
        role: Cookies.get('role'),
        email: Cookies.get('email'),
    };

}
export function removeUserCookies() {
    Cookies.remove('username');
    Cookies.remove('email');
    Cookies.remove('appkey');
    Cookies.remove('role');

}