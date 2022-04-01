import faker from 'faker';

const request = indexedDB.open("offline_db", 1);
let db;

request.onupgradeneeded = function() {
  // La base de données n'existait pas auparavant, alors créez des "stores" d'objets et des index.
  db = request.result;
  const store = db.createObjectStore("customers", {keyPath: "id"});

  // Create indexes
  store.createIndex("by_name", "name", {unique: false});
  store.createIndex("by_location", "localisation");


  for(let i = 0; i < 20; i++) {
    store.add({
      id: i,
      url: `customers/${i}`,
      name: `${faker.name.firstName()} ${faker.name.lastName()}`, // Création d'utilisateur aléatoire (nom + prenom),
      localisation: `${faker.address.city()}, ${faker.address.countryCode()}`,// Création d'une localisation aléatoire (Ville + Pays),
      latestOrderUrl: `orders/${faker.random.number()}`
    });
  }

  store.add({
    id: 128, // Clé de liaison entre les deux store
    url: `customers/128`, 
    name: `${"Baptiste"} ${"scherrier"}`, // Création d'un utilisateur 
    localisation: `${"Hazebrouck"}, ${"Fr"}`,//,
    latestOrderUrl: `orders/${faker.random.number()}`
  });
};

request.onsuccess = function() {
  db = request.result;
};

request.onblocked = function(event) {
  alert("Erreur");
};

