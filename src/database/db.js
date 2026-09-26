const store = {
  administradores: [],
  alunos: [],
  disciplinas: [],
  matriculas: [],
  notas: [],
  trabalhos: [],
};

function all(collection) {
  return store[collection];
}

function findById(collection, id) {
  return store[collection].find((item) => item.id === id);
}

function insert(collection, item) {
  store[collection].push(item);
  return item;
}

function update(collection, id, changes) {
  const item = findById(collection, id);
  if (!item) return null;
  Object.assign(item, changes, { updatedAt: new Date().toISOString() });
  return item;
}

function remove(collection, id) {
  const index = store[collection].findIndex((item) => item.id === id);
  if (index === -1) return false;
  store[collection].splice(index, 1);
  return true;
}

export default { store, all, findById, insert, update, remove };
