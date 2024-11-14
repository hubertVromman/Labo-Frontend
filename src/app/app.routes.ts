import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AuteurComponent } from './components/admin/auteur/auteur.component';
import { LivreComponent } from './components/admin/livre/livre.component';
import { BibliothequeComponent } from './components/bibliotheque/bibliotheque.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { PanierComponent } from './components/panier/panier.component';
import { ProfileComponent } from './components/profile/profile.component';
import { adminConnectedGuard } from './guards/admin-connected.guard';
import { userConnectedGuard } from './guards/user-connected.guard';
import { auteursResolver } from './resolvers/auteurs.resolver';
import { bibliothequeResolver } from './resolvers/bibliotheque.resolver';
import { livresResolver } from './resolvers/livres.resolver';

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "profile", canActivate: [userConnectedGuard], component: ProfileComponent },
  { path: "bibliotheque/:id", resolve: {bibliotheque: bibliothequeResolver}, component: BibliothequeComponent },
  { path: "panier", component: PanierComponent },
  { path: 'admin', component: AdminComponent, canActivate: [adminConnectedGuard], canActivateChild: [adminConnectedGuard],
    children: [
      {
        path: 'auteur',
        component: AuteurComponent,
      },
      {
        path: 'livre',
        resolve: {livres: livresResolver, auteurs: auteursResolver},
        component: LivreComponent,
      },
      { path: "**", component: ErrorComponent },
    ],
  },
  { path: "**", component: ErrorComponent }
];
