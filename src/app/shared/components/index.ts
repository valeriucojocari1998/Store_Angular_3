import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { dialogsComponents } from './dialogs';
import { wrappersComponents } from './wrappers';

export const sharedComponents = [
  ...wrappersComponents,
  ...dialogsComponents,
  FooterComponent,
  NavbarComponent,
];
