/** Get a random item from an array or string. */

function choice(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export { choice };