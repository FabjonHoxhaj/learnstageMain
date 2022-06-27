import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) { }

    sendDataHashtags(hashtag: any) {
        const body = JSON.stringify(hashtag);
        const headers = new HttpHeaders({ "Content-Type": "application/json" }); //hiermit weiß die DB welche Art von Daten ich schicke
        return this.http.post("https://learnstage-88b93-default-rtdb.asia-southeast1.firebasedatabase.app/hashtags.json", body, { headers: headers });
    }

    getData() {
        const DBEntries = this.http.get("https://learnstage-88b93-default-rtdb.asia-southeast1.firebasedatabase.app/hashtags.json")
        return DBEntries;
    }

    sendDataForm(myForm: any) {
        const body = JSON.stringify(myForm);
        const headers = new HttpHeaders({ "Content-Type": "application/json" });
        return this.http.post("https://learnstage-88b93-default-rtdb.asia-southeast1.firebasedatabase.app/FormData.json", body, { headers: headers });
    }

}