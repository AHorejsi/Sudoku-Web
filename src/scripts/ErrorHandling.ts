import { Endpoints, ENVIRONMENT_MODE } from "./StringConstants";
import { NavigateFunction } from "react-router";

function handleError(error: any, nav: NavigateFunction): void {
    nav(Endpoints.ERROR, { state: error.stack });
}

export { handleError };