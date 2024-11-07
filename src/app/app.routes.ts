import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { userConnectedGuard } from './guards/user-connected.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { BibliothequeComponent } from './components/bibliotheque/bibliotheque.component';
import { bibliothequeResolver } from './resolvers/bibliotheque.resolver';
import { PanierComponent } from './components/panier/panier.component';

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "profile", canActivate: [userConnectedGuard], component: ProfileComponent },
  { path: "bibliotheque/:id", resolve: {bibliotheque: bibliothequeResolver}, component: BibliothequeComponent },
  { path: "panier", component: PanierComponent },
  { path: "**", component: ErrorComponent }
];
