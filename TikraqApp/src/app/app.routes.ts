import { Routes } from '@angular/router';

import { AboutMeComponent } from "./website/about-me/about-me.component";

import { ContactComponent } from "./website/contact/contact.component";
import { CourseComponent } from "./website/course/course.component";
import { LanguageComponent } from "./website/language/language.component";
import { LearnComponent } from "./website/learn/learn.component";
import { LessonComponent } from "./website/lesson/lesson.component";
import { LessonAComponent } from "./website/lesson-a/lesson-a.component";
import { LoginComponent } from "./website/login/login.component";
import {MainComponent} from './website/main/main.component';
import { ProgressComponent } from "./website/progress/progress.component";
import { QualifyComponent } from "./website/qualify/qualify.component";
import { RegisterComponent } from "./website/register/register.component";
import { TranslateComponent } from "./website/translate/translate.component";
import { UserComponent } from "./website/user/user.component";
import {EditarPerfilComponent} from './website/editar-perfil/editar-perfil.component';
import {MainUserComponent} from './website/main-user/main-user.component';
import {MainAdminComponent} from './website/main-admin/main-admin.component';
import {LoginAdminComponent} from './website/login-admin/login-admin.component';
import {SubscriptionComponent} from './website/subscription/subscription.component';
import {TranslateFreeComponent} from './website/translate-free/translate-free.component';
import {TranslatePremiumComponent} from './website/translate-premium/translate-premium.component';
import {MainUserPremiumComponent} from './website/main-user-premium/main-user-premium.component';
import {MainUserFreeComponent} from './website/main-user-free/main-user-free.component';
import {RegisterCourseComponent} from './website/register-course/register-course.component';
import {RegisterLanguageComponent} from './website/register-language/register-language.component';
import {PreguntaComponent} from './website/pregunta/pregunta.component';
import {RegisterLessonComponent} from './website/register-lesson/register-lesson.component';
import {RegisterPreguntaComponent} from './website/register-pregunta/register-pregunta.component';
import {PreguntaUsuarioComponent} from './website/pregunta-usuario/pregunta-usuario.component';
import {ListarPreguntasComponent} from './website/listar-preguntas/listar-preguntas.component';


export const routes: Routes = [
  { path:'', component: MainComponent},
  { path: 'about-me', component: AboutMeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'course', component: CourseComponent },
  { path: 'editar-perfil', component: EditarPerfilComponent },
  { path: 'language', component: LanguageComponent },
  { path: 'learn', component: LearnComponent },
  { path: 'lesson', component: LessonComponent },
  { path: 'lessonA', component: LessonAComponent },
  { path: 'listar-preguntas', component: ListarPreguntasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-admin', component: LoginAdminComponent },
  { path: 'main-user', component: MainUserComponent},
  { path: 'main-user-free', component: MainUserFreeComponent},
  { path: 'main-user-premium', component: MainUserPremiumComponent},
  { path: 'main-admin', component: MainAdminComponent},
  { path: 'pregunta', component: PreguntaComponent },
  { path: 'pregunta-usuario', component: PreguntaUsuarioComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'qualify', component: QualifyComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-course', component: RegisterCourseComponent },
  { path: 'register-language', component: RegisterLanguageComponent},
  { path: 'register-lesson', component: RegisterLessonComponent},
  { path: 'register-pregunta', component: RegisterPreguntaComponent},
  { path: 'translate-free', component: TranslateFreeComponent },
  { path: 'translate', component: TranslateComponent },
  { path: 'translate-premium', component: TranslatePremiumComponent },
  { path: 'user', component: UserComponent }
];
