import { resolve } from "path";

export class Region {
    public id: number | undefined;
    public name: string | undefined;
    public countryId: number | undefined;
}

function api<T>(url: string): Promise<T> {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<T>
        })

}

export class LocationApi {
    constructor() {

}
    public async getRegions(): Promise<Array<Region>> {

        let response: Array<Region> = [];
        await api<Array<Region>>("https://localhost:44311/Api/Values").then((value: Array<Region>) => {
            response = value;
            alert('hello');
            console.log(value);
        }).catch(error => console.log(error.message));

        return response;

    }
}