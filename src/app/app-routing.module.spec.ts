import { LazyFeatureModule } from './lazy-feature/lazy-feature.module';
import { Location } from '@angular/common';
import { NgModuleFactoryLoader } from '@angular/core';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeatureComponent } from './feature/feature.component';
import { FeatureModule } from './feature/feature.module';
import { LazyFeatureComponent } from './lazy-feature/lazy-feature.component';

describe('Router: App', () => {

    let location: Location;
    let router: Router;

    // Configure router testing module
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FeatureModule,
                RouterTestingModule.withRoutes(routes)
            ],
            declarations: [
                AppComponent,
                DashboardComponent,
            ],
            providers: [Location]
        }).compileComponents();

        router = TestBed.get(Router);
        location = TestBed.get(Location);
    });

    // Test for asyncFake
    it('fakeAsync works', fakeAsync(() => {
        const promise = new Promise(resolve => {
            setTimeout(resolve, 10);
        });
        let done = false;
        promise.then(() => done = true);
        tick(50);
        expect(done).toBeTruthy();
    }));

    it('navigate to "" redirects you to /dashboard', fakeAsync(() => {
        const fixture = TestBed.createComponent(DashboardComponent);
        router.navigateByUrl('');
        tick();
        fixture.detectChanges();
        expect(location.path()).toBe('/dashboard');
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('p').textContent).toContain('dashboard works!');
    }));

    it('navigate to "feature" redirects to /feature', fakeAsync(() => {
        const fixture = TestBed.createComponent(FeatureComponent);
        router.navigateByUrl('/feature');
        tick();
        fixture.detectChanges();
        expect(location.path()).toBe('/feature');
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('p').textContent).toContain('feature works!');
    }));

    it('navigate to "lazy" redirects to /lazy', fakeAsync(() => {
        const loader = TestBed.get(NgModuleFactoryLoader);
        loader.stubbedModules = {lazyModule: LazyFeatureModule};
        const fixture = TestBed.createComponent(LazyFeatureComponent);
        router.resetConfig([
            { path: 'lazy', loadChildren: 'lazyModule' },
        ]);
        router.navigateByUrl('/lazy');
        tick();
        fixture.detectChanges();
        expect(location.path()).toBe('/lazy');
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('p').textContent).toContain('lazy feature works!');
    }));
});
