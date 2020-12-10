import {createBrowserHistory} from "history";

let baseUrl: *;
baseUrl = document.getElementsByTagName('base')[0]?.getAttribute('href');
export const history = createBrowserHistory({basename: baseUrl});

