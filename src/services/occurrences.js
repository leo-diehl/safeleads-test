export default function getOccurrences(filters) {
  console.log(JSON.stringify(filters)); // eslint-disable-line
  // Mocked
  return Promise.resolve([
    {
      id: 1,
      entity: {
        id: 95,
        type: 'project',
        name: 'Projeto Casa Tristana Energia Solar',
        image: 'https://constructionreviewonline.com/wp-content/uploads/2017/05/temp-macys-case-study.jpg',
        simulation: {
          value: 871333.00,
        },
        user: {
          id: 1,
          role: 1,
        },
        status: {
          id: 1,
          step: 4,
        },
      },
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent odio arcu, blandit quis nulla a, vulputate vulputate ante. Quisque pharetra finibus ex, id efficitur massa. Sed placerat pretium urna eu interdum. Curabitur a risus quam. Sed vitae nisi metus. Nunc dolor ante, porttitor vitae volutpat eget, accumsan scelerisque elit. Maecenas sit amet suscipit dolor, eu condimentum dolor. Aenean eget tincidunt tellus.',
      created_at: '2019-12-13 12:23',
    },
    {
      id: 2,
      entity: {
        id: 112,
        type: 'lead',
        name: 'Marcos Aurelio',
        image: 'https://image.shutterstock.com/image-photo/closeup-daylight-portrait-young-smiling-260nw-1295490406.jpg',
        user: {
          id: 2,
          role: 2,
        },
        status: {
          id: 2,
          step: 3,
        },
      },
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent odio arcu, blandit quis nulla a, vulputate vulputate ante. Quisque pharetra finibus ex, id efficitur massa. Sed placerat pretium urna eu interdum. Curabitur a risus quam. Sed vitae nisi metus. Nunc dolor ante, porttitor vitae volutpat eget, accumsan scelerisque elit. Maecenas sit amet suscipit dolor, eu condimentum dolor. Aenean eget tincidunt tellus.',
      created_at: '2020-01-05 09:00',
    },
  ]);
}
