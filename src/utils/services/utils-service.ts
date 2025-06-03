export class UtilsService {

    static actionsForExpiredToken(){
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
}