// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	mova: {
		environment: 'VAL',
		brokerView: {
			autoRedirect: true
		},
		initView: {
			autoRedirect: true,
			skipVersionRequirementsCheck: false,
			showVersionNewsWeb: true,
			showVersionNewsMobile: true
		},
		loginView: {
			dametokenSystemEnabled: true,
			dametokenButtonLabel: 'Usuario y contraseña',
			dametokenInfoLabel: 'Introduzca su usuario y contraseña de Directorio Activo',
			wso2SystemEnabled: true,
			wso2ButtonLabel: 'Usuario y contraseña (wso2)',
			wso2InfoLabel: 'Introduzca su usuario y contraseña de Directorio Activo',
			autologinSystemEnabled: true,
			autologinButtonLabel: 'Broker de identidades',
			autologinInfoLabel: 'Acceda mediante el broker de identidades con Certificado Digital, Clave PIN o Clave Permanente'
		},
		authenticationService: {
			authenticationDefaultSystem: 'dameToken', // dameToken | wso2 | autologin
			technicalModules: ['XXXX_APP'],
			authenticationTechnicalModuleIndex: 0,
			dameTokenConfig: {
				uriBase: 'https://valesb.madrid.org/fesb_rest_token/v1/token/getToken',
				uriEliminaToken: 'https://valesb.madrid.org/fesb_rest_token/v1/token/eliminaToken',
				authenticationSystem: 'Intranet',
				expirationTime: 604800000, // Una semana en milisegundos
			},
			autologinConfig: {
				appRedirect: 'org.madrid.mova.xxxxApp',
				uriBase: 'https://valintranet.madrid.org/auto_login/acceso.jsf?',
				uriLogout: 'https://valintranet.madrid.org/auto_login/logout.jsf?',
				uriGetToken: 'https://valesb.madrid.org/fesb_rest_token/v1/token/getTokenAutologin',
				uriAutorest: 'https://valintranet.madrid.org/auto_rest/v1/ticket/valida/',
				uriRedirectSite: 'https:gestiona3.madrid.org/portalapps/util/autologin-redirect/',
				paramIosSS: 'PRIVADO',
				paramIosPass: '75D9C94D34E517BE7C434FC195D45D84',
				paramAndroidSS: 'PRIVADO',
				paramAndroidPass:'75D9C94D34E517BE7C434FC195D45D84',
				paramWebappSS: 'PRIVADO',
				paramWebappPass: '75D9C94D34E517BE7C434FC195D45D84',
				paramWebappOkUrl: '',
				paramWebappOkUrlLogout: ''
			},
			wso2Config: {
				uriBase: 'https://apis.des.comunidad.madrid/token',
				uriRevoke: 'https://apis.des.comunidad.madrid/revoke',
				consumerKey: 'sGnz8A3FdBwvPUzusvHOnogD0sQa',
				consumerSecret: 'nxyAYPP7ctjVDo_Ip1DeXV6cIFwa',
				customDomain: '',
				customTenant: '',
				scopes: [
					{'scope': 'NXCA_sc_consulta', 'active': false},
					{'scope': 'NXCA_sc_escritura', 'active': false},
				],
			}
		},
		backendService: {
			uriCheckVersion: 'https://valesb.madrid.org/mova_rest_checkNewVersion/v1',
			uriVersionNews: 'https://valintranet.madrid.org/mova_rest_servicios/v1/consultas/do',
			uriScores: 'https://valintranet.madrid.org/mova_rest_servicios/v1/consultas/actualizar',
		},
		interceptorService: {
			httpHeaderTokenAuthAlways: true,
			apiKeys: [
				{
					"name":"pruebaKey",
					"apiKey": "Bearer 636fb144-1077-31a5-abba-7523b3bc1370"
				}
			],
		},
		notificationService: {
			uriBase: 'https://valintranet.madrid.org/mova_rest_notificaciones/v4/',
			alwaysShowIosTemplate: false,
			appKey: '63D4C088809BED822C45124586507E4F',
			browserServiceUri: 'http://push.api.phonegap.com/v1/push',
			environment: 'VAL',
			receivedLimit: 20,
		},
		recaptchaService: {
			uriUtilSite: 'https://gestiona3.madrid.org/portalapps/util/recaptcha/',
			siteKey: '',
		},
		localStorageService: {
			cryptoPassword: 'YZERXMNd9e2e',
			mainNodeSuffix: '',
		},
		sessionStorageService: {
			cryptoPassword: 'YZERXMNd9e2e',
			mainNodeSuffix: '',
		},
	},
	app: {		// Situar aqui las variables propias de la app segun entornos

	},
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
