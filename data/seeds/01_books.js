/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('books').del();

  await knex('books').insert([
    { title: 'Sefiller', author: 'Victor Hugo', year: 1862 },
    { title: 'Suç ve Ceza', author: 'Fyodor Dostoyevski', year: 1866 },
    { title: 'Simyacı', author: 'Paulo Coelho', year: 1988 }
  ]);
};