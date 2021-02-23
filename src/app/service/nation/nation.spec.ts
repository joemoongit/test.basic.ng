import { TestBed } from '@angular/core/testing';
import {NationService} from './index'
import {HttpClientModule} from '@angular/common/http';

// Straight Jasmine testing without Angular's testing support
describe('NationService', () => {
    let service: NationService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [NationService]
          });
        TestBed.configureTestingModule({ providers: [NationService] });
        service = TestBed.inject(NationService);
      });

    it(`should get 250 nations from nation service'`, () => {
        service.getAllNations().subscribe(value => {
            expect(value.length).toEqual(250);
          });
      });
  });