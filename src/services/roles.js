export default function getAllRoles() {
  return Promise.resolve([
    {
      id: 1,
      name: 'Vendedor',
    },
    {
      id: 2,
      name: 'Tecnico',
    },
    {
      id: 3,
      name: 'Administrador',
    },
    {
      id: 4,
      name: 'Customer Success',
    },
  ]);
}
