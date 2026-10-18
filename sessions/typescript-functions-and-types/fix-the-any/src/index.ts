function getFirstName(user: any) {
  return user.name.split(" ")[0];
}

console.log(getFirstName({ name: "Max Muster" }));
console.log(getFirstName({ firstName: "Max" }));
console.log(getFirstName(undefined));
