export default function getAllStatus() {
  return Promise.resolve([
    {
      id: 1,
      name: 'Elaboracao de Propos.',
      color: 'blue',
      steps: [
        {
          id: 4,
          name: 'Visita Tecnica',
        },
      ],
    },
    {
      id: 2,
      name: 'Em Atendimento',
      color: 'green',
      steps: [
        {
          id: 3,
          name: 'Segunda Tentativa',
        },
      ],
    },
  ]);
}
