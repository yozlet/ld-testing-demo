// Create user context object
const userContext = {
  key: 'anon',
  custom: {
  }
}
// Iterate through browser cookies. Any cookie starting with 'TESTFLAG_'
// should be added to the user context.
const cookies = document.cookie.split('; ');
cookies.forEach(cookie => {
  let name, value;
  [name, value] = cookie.split('=');
  if (name.startsWith('TESTFLAG_')) {
    console.log('Adding context ' + name + ' with value ' + value);
    userContext.custom[name] = value;
  }
});

// Initialise the LaunchDarkly client
const ldClient = LDClient.initialize('63747f12b4353c10dbe2636f', userContext);

ldClient.on('ready', () => {
  const heading = document.getElementsByTagName('h1').item(0);
  const color = ldClient.variation('set-heading-color', 'red');
  heading.className = color;
  console.log('Set heading color: ' + color);
  heading.hidden = false;
});