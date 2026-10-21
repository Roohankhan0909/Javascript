const name = "Alex";

function greet(person) {
  console.log(`Hello, ${person}!`);
}

greet(name);

const guests = ["Jordan", "Sam", "Taylor"];

function greetGuests(people) {
  if (!Array.isArray(people)) {
    throw new TypeError("Expected an array of names.");
  }

  people.forEach((person) => greet(person));
  console.log(`Welcomed ${people.length} guests.`);
}

function createInvitation(person, event) {
  if (typeof person !== "string" || typeof event !== "string") {
    throw new TypeError("Person and event must be strings.");
  }

  return `Hi ${person}, you're invited to ${event}.`;
}

greetGuests(guests);
console.log(createInvitation(name, "the summer celebration"));
