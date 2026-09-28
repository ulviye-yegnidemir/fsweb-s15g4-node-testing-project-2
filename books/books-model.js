const db = require('../data/db-config');
function getAll(){
    return db('books');
}
function getById(id) {
    return db('books').where('id',id).first();
}
async function add(book) {
    const [id] = await db('books').insert(book);
    return getById(id);
}
function remove(id) {
    return db('books').where('id',id).del();
}
module.exports = {
    getAll,
    getById,
    add,
    remove,
};