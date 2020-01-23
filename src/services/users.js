export default function getAllUsers() {
  return Promise.resolve([
    {
      id: 1,
      name: 'Carlos Alberto',
      image: 'https://image.shutterstock.com/image-photo/men-latin-american-hispanic-ethnicity-260nw-282626387.jpg',
    },
    {
      id: 2,
      name: 'Marcos Rocha',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCm_d1uI7YlOvj2qyO0MrRUuWOpaPjJYxa34A33JE3BCowofp8&s',
    },
  ]);
}
