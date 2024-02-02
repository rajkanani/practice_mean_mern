let LIVE = Number(process.env.REACT_APP_LIVE);

let api_url = {
    1: process.env.REACT_APP_LIVE_BASE_URL,
}

export const ApiBaseUrl = api_url[LIVE];

export const API_PATH = {
    login: ApiBaseUrl + 'api/v1/login'
}

export function timeAgo(dateString) {
    const currentDate = new Date();
    const pastDate = new Date(dateString);

    const timeDifference = currentDate - pastDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days >= 2) {
        const formattedDate = formatDate(pastDate);
        return formattedDate;
    } else if (days > 0) {
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (hours > 0) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes > 0) {
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
        return 'Just now';
    }
}

function formatDate(date) {
    const options = { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

export function Getcookie(cookieName) {
    const cookieRegex = new RegExp(`(?:^|;\\s*)${cookieName}=([^;]*)`);
    const match = document.cookie.match(cookieRegex);

    return match ? JSON.parse(decodeURIComponent(match[1])) : null;
}

export function setCookie(cookieName, cookieValue, expirationDays) {
    const d = new Date();
    d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${cookieName}=${encodeURIComponent(JSON.stringify(cookieValue))}; ${expires}; path=/`;
}
