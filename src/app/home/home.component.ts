
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Nation } from '../model/nation';
import { Router, ActivatedRoute } from '@angular/router';
import { NgZone } from '@angular/core';
import { NationService } from '../service/nation'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit,OnDestroy
{
    zoom = 5;
    center = {
        lat:0,
        lng:0,
    }
    nations: Nation[] = [];
    hilitedName = '...';
    selectedNation :Nation = {
    name: "",
    nativeName: "",
    alpha2Code: "",
    alpha3Code: "",
    capital: "",
    flag: "",
    latitude: 0,
    longitude: 0,
    latlng: []
   };
;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ngZone: NgZone ,
        private changeDetectorRef:ChangeDetectorRef,
        private nationService: NationService ) {
       
    }

    ngOnInit(): void {
        const routeParams = this.route.snapshot.paramMap;
        const countryIdFromRoute = routeParams.get('countryId');

        this.route.params.subscribe((params) => { 
            const id = params['countryId']
            if(id){
                this.ngZone.run(() => {
                    this.tryFindNation(id);
                });
            }
        })

        this.nationService.getAllNations()
            .pipe()
            .subscribe((nations:Nation[]) => {
                let mapped_array = nations.map(x => {
                    let lat = 0;
                    let lng = 0;

                    if(x.latlng && x.latlng.length === 2){
                        lat = x.latlng[0],
                        lng = x.latlng[1]
                    }
                    return {
                        ...x,
                    latitude: lat,
                    longitude: lng
                    }
                });
                this.nations = mapped_array ? mapped_array : [];

                if(countryIdFromRoute){
                    this.tryFindNation(countryIdFromRoute);
                }
                else{
                    this.changeDetectorRef.detectChanges();
                }
            });
      
    }

    tryFindNation(id:string):void{
        const match = this.nations.find(x => x.alpha3Code.toLocaleLowerCase() === id.toLocaleLowerCase())
        if(match){
            this.selectedNation = match;
            this.center = {
                lat: match.latitude,
                lng: match.longitude,
            }
            this.changeDetectorRef.detectChanges();
        }
    }

    hilite( nation:Nation ) {
        this.hilitedName = nation.name;
        this.changeDetectorRef.detectChanges();
    }

    selectNation( nation:Nation ) {
        this.selectedNation = nation;
        this.center = {
            lat: nation.latitude,
            lng: nation.longitude,
        }
        this.changeDetectorRef.detectChanges();
        //this.router.navigate([`/home/${nation.alpha3Code.toLocaleLowerCase()}`,]);
        this.router.navigate(['home', {countryId: nation.alpha3Code}]);

    }

    ngOnDestroy(): void {
    }
}
