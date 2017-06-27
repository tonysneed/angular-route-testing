# Angular Route Testing

_A sample app for Angular route testing._

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.3.

## App Setup

1. Generate app with routing included.

    ```
    ng new angular-route-testing --routing
    ```

2. Generate components and modules with routing included.

    ```
    ng g c dashboard -r
    ng g m feature -r
    ng g c feature -m
    ```

3. Configure app and feature routing modules.

    ```ts
    // app-routing.module.ts
    const routes: Routes = [
        { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'feature', component: FeatureComponent }
    ];
    ```

    ```ts
    // feature-routing.module.ts
    const routes: Routes = [
        { path: 'feature', component: FeatureComponent }
    ];
    ```

4. Add  router links to app component template

    ```html
    <div>
        <a [routerLink]="['/feature']">Feature</a>
        <br/>
        <a [routerLink]="['']">Home</a>
    </div>
    ```

## Route Testing

1. Create an app routing spec and configure router testing module.

    ```ts
    // app-routing.module.spec.ts
    describe('Router: App', () => {

        let location: Location;
        let router: Router;
        let fixture: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    FeatureModule,
                    RouterTestingModule.withRoutes(routes)
                ],
                declarations: [
                    AppComponent,
                    DashboardComponent
                ]
            }).compileComponents();

            router = TestBed.get(Router);
            location = TestBed.get(Location);
        });
    });
    ```

2. Add a test for `fakeAsync`.

    ```ts
    it('fakeAsync works', fakeAsync(() => {
        const promise = new Promise(resolve => {
            setTimeout(resolve, 10);
        });
        let done = false;
        promise.then(() => done = true);
        tick(50);
        expect(done).toBeTruthy();
    }));
    ```

3. Add a test for redirecting /dashboard to root.

    ```
    it('navigate to "" redirects you to /dashboard', fakeAsync(() => {
        const fixture = TestBed.createComponent(DashboardComponent);
        router.navigateByUrl('');
        tick();
        fixture.detectChanges();
        expect(location.path()).toBe('/dashboard');
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('p').textContent).toContain('dashboard works!');
    }));
    ```

4. Add a test for navigating to /feature.

    ```
    it('navigate to "feature" redirects to /feature', fakeAsync(() => {
        const fixture = TestBed.createComponent(FeatureComponent);
        router.navigateByUrl('/feature');
        tick();
        fixture.detectChanges();
        expect(location.path()).toBe('/feature');
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('p').textContent).toContain('feature works!');
    }));
    ```

7. Enable lazy loading of the feature module.

    * Remove `FeatureModule` from `AppModule`.
    * Change feature path in app routing module to load children.
    
    ```
    { path: 'feature', loadChildren: 'app/feature/feature.module#FeatureModule' }
    ```

    * Remove 'feature' from path in feature routing module.

    ``` 
    { path: '', component: FeatureComponent }
    ```

