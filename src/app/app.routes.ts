import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AuteurComponent } from './components/admin/auteur/auteur.component';
import { LivreComponent } from './components/admin/livre/livre.component';
import { BibliothequeComponent } from './components/bibliotheque/bibliotheque.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PanierComponent } from './components/panier/panier.component';
import { ProfileComponent } from './components/profile/profile.component';
import { userConnectedGuard } from './guards/user-connected.guard';
import { bibliothequeResolver } from './resolvers/bibliotheque.resolver';
import { livreResolver } from './resolvers/livre.resolver';

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "profile", canActivate: [userConnectedGuard], component: ProfileComponent },
  { path: "bibliotheque/:id", resolve: {bibliotheque: bibliothequeResolver}, component: BibliothequeComponent },
  { path: "panier", component: PanierComponent },
  { path: 'admin', component: AdminComponent,
    children: [
      {
        path: 'auteur',
        component: AuteurComponent,
      },
      {
        path: 'livre',
        resolve: {livre: livreResolver},
        component: LivreComponent,
      }
    ],
  },
  { path: "**", component: ErrorComponent }
];
