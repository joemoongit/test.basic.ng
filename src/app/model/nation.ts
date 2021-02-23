
export interface Nation
{
    readonly name: string;
    readonly nativeName: string;
    readonly alpha2Code: string;
    readonly alpha3Code: string;
    readonly capital: string;
    readonly flag: string;
    readonly latitude: number;
    readonly longitude: number;
    readonly latlng: ReadonlyArray<number>;
}