// Datos para "Agregar a pantalla de inicio".
// El cliente instala "Hoshito" (abre su tarjeta); el personal instala "Hoshito Caja" (abre su pantalla según su rol).
export const CUSTOMER_APP = {
  manifest: '/cliente.webmanifest',
  appleWebApp: { capable: true, title: 'Hoshito', statusBarStyle: 'default' },
};

export const STAFF_APP = {
  manifest: '/personal.webmanifest',
  appleWebApp: { capable: true, title: 'Hoshito Caja', statusBarStyle: 'default' },
};
