module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'weapons',
      [
        {
          name: 'Masamune',
          image_path:
            'https://static.wikia.nocookie.net/chrono/images/5/50/MasamuneU.png',
          summary:
            'This weapon is kinda cool not gonna lie. It can kill Magus for sure, trust me bro.',
          synonyms: null,
          rating: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    ),

  down: (queryInterface) =>
    queryInterface.bulkDelete('weapons', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }),
};
