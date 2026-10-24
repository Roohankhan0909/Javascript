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

function createEventManager(eventName, invitees) {
  if (typeof eventName !== "string" || eventName.trim() === "") {
    throw new TypeError("Event name must be a non-empty string.");
  }
  if (
    !Array.isArray(invitees) ||
    invitees.some((person) => typeof person !== "string")
  ) {
    throw new TypeError("Invitees must be an array of names.");
  }

  const responses = new Map(invitees.map((person) => [person, "pending"]));

  return {
    invite(person) {
      if (!responses.has(person)) {
        throw new Error(`${person} is not on the guest list.`);
      }
      return createInvitation(person, eventName);
    },

    respond(person, response) {
      if (!responses.has(person)) {
        throw new Error(`${person} is not on the guest list.`);
      }
      if (!["accepted", "declined"].includes(response)) {
        throw new TypeError('Response must be "accepted" or "declined".');
      }
      responses.set(person, response);
    },

    getSummary() {
      const summary = { accepted: 0, declined: 0, pending: 0 };
      for (const response of responses.values()) {
        summary[response] += 1;
      }
      return summary;
    },
  };
}

const event = createEventManager("the summer celebration", guests);
event.respond("Jordan", "accepted");
event.respond("Sam", "declined");
console.log("Guest summary:", event.getSummary());
console.log("Jordan invitation:", event.invite("Jordan"));
console.log("Sam invitation:", event.invite("Sam"));
