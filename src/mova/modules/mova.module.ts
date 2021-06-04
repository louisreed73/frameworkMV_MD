import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';

// Importación desde la dependencia empaquetada
import { MvBrokerViewModule } from '@mova/components/broker-view'
import { MvButtonModule } from '@mova/components/button'
import { MvButtonLoginModule } from '@mova/components/button-login'
import { MvButtonScrollToTopModule } from '@mova/components/button-scroll-to-top'
import { MvComponentHostModule } from '@mova/components/component-host'
import { MvCheckboxModule } from '@mova/components/checkbox'
import { MvCoreModule } from '@mova/components/core'
import { MvDeviceViewModule } from '@mova/components/device-view'
import { MvDialogModule } from '@mova/components/dialog'
import { MvDialogErrorModule } from '@mova/components/dialog-error'
import { MvFooterTabModule } from '@mova/components/footer-tab'
import { MvHeaderModule } from '@mova/components/header'
import { MvInitViewModule } from '@mova/components/init-view'
import { MvInputModule } from '@mova/components/input'
import { MvLoginViewModule } from '@mova/components/login-view'
import { MvMainFrameModule } from '@mova/components/main-frame'
import { MvNotificationConfigModule } from '@mova/components/notification-config'
import { MvRadioModule } from '@mova/components/radio'
import { MvRateViewModule } from '@mova/components/rate-view'
import { MvRecaptchaModule } from '@mova/components/recaptcha'
import { MvRenderOnScrollModule } from '@mova/components/render-on-scroll'
import { MvSelectModule } from '@mova/components/select'
import { MvSnackBarModule } from '@mova/components/snack-bar'
import { MvStarModule } from '@mova/components/star';
import { MvTableResponsiveModule } from '@mova/components/table-responsive'
import { MvTextareaModule } from '@mova/components/textarea'
import { MvTreeFilterModule } from '@mova/components/tree-filter'
import { MvValuesListModule } from '@mova/components/values-list'

/*
// Importación desde el código para desarrollo
import { MvPruebaModule } from '../../../../dist/packages/mova/prueba';
import { MvTreeFilterModule } from '../../../../dist/packages/mova/tree-filter';
*/

@NgModule({
  declarations: [
  ],
  imports: [
    LayoutModule,
    MvBrokerViewModule,
    MvButtonModule,
    MvButtonLoginModule,
    MvButtonScrollToTopModule,
    MvComponentHostModule,
    MvCheckboxModule,
    MvCoreModule,
    MvDeviceViewModule,
    MvDialogModule,
    MvDialogErrorModule,
    MvFooterTabModule,
    MvHeaderModule,
    MvInitViewModule,
    MvInputModule,
    MvLoginViewModule,
    MvMainFrameModule,
    MvNotificationConfigModule,
    MvRadioModule,
    MvRateViewModule,
    MvRecaptchaModule,
    MvRenderOnScrollModule,
    MvSelectModule,
    MvSnackBarModule,
    MvTableResponsiveModule,
    MvTextareaModule,
    MvTreeFilterModule,
    MvValuesListModule,
    MvStarModule
  ],
  providers: [
  ],
  exports: [
    MvBrokerViewModule,
    MvButtonModule,
    MvButtonLoginModule,
    MvButtonScrollToTopModule,
    MvComponentHostModule,
    MvCheckboxModule,
    MvCoreModule,
    MvDeviceViewModule,
    MvDialogModule,
    MvDialogErrorModule,
    MvFooterTabModule,
    MvHeaderModule,
    MvInitViewModule,
    MvInputModule,
    MvLoginViewModule,
    MvMainFrameModule,
    MvNotificationConfigModule,
    MvRadioModule,
    MvRateViewModule,
    MvRecaptchaModule,
    MvRenderOnScrollModule,
    MvSelectModule,
    MvSnackBarModule,
    MvTableResponsiveModule,
    MvTextareaModule,
    MvTreeFilterModule,
    MvValuesListModule,
    MvStarModule
  ]
})
export class MovaModule {}
