const { applicationConfig } = window as {} as { applicationConfig: any };
const { api } = applicationConfig;
const { baseUrl } = api;
// Values stored in assets/appconfig.js
export const appConfig = {
    api: {
        baseUrl,
    },
};
