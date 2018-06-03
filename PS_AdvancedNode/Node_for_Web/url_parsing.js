/**
 * The 'true' option parses the query string of the url.
 * also: (Notice the - p flag, and the command thusly executed and value obtained without going inside the node repl)
 */
// command:
// node - p "url.parse('https://app.pluralsight.com/player?course=nodejs-advanced&author=samer-buna&name=nodejs-advanced-m5&clip=4&mode=live', true)"

 /*
{
    protocol: 'https:',
    slashes: true,
    auth: null,
    host: 'app.pluralsight.com',
    port: null,
    hostname: 'app.pluralsight.com',
    hash: null,
    search: '?course=nodejs-advanced&author=samer-buna&name=nodejs-advanced-m5&clip=4&mode=live',
    query: {
        course: 'nodejs-advanced',
        author: 'samer-buna',
        name: 'nodejs-advanced-m5',
        clip: '4',
        mode: 'live'
    },
    pathname: '/player',
    path: '/player?course=nodejs-advanced&author=samer-buna&name=nodejs-advanced-m5&clip=4&mode=live',
    href: 'https://app.pluralsight.com/player?course=nodejs-advanced&author=samer-buna&name=nodejs-advanced-m5&clip=4&mode=live'
}*/

/**
 * The inverse of the above:
    > .editor
    Entering editor mode( ^ D to finish, ^ C to cancel)
 */


var urlstring = {
    protocol: 'https:',
    slashes: true,
    auth: null,
    host: 'app.pluralsight.com',
    port: null,
    hostname: 'app.pluralsight.com',
    hash: null,
    search: '?course=nodejs-advanced&author=samer-buna&name=nodejs-advanced-m5&clip=4&mode=live',
    query: {
        course: 'nodejs-advanced',
        author: 'samer-buna',
        name: 'nodejs-advanced-m5',
        clip: '4',
        mode: 'live'
    },
    pathname: '/player',
    path: '/player?course=nodejs-advanced&author=samer-buna&name=nodejs-advanced-m5&clip=4&mode=live'
}

url.format(urlstring) // Prints: 'https://app.pluralsight.com/player?course=nodejs-advanced&author=samer-buna&name=nodejs-advanced-m5&clip=4&mode=live'

/**
 * Only interested in the querystring?
 */
var qry = {
    name: 'Somjit Nag',
    github: 'https://github.com/Suedo'
}

querystring.stringify(qry) // Prints: 'name=Somjit%20Nag&github=https%3A%2F%2Fgithub.com%2FSuedo'

// and the opposite:

> querystring.parse('name=Somjit%20Nag&github=https%3A%2F%2Fgithub.com%2FSuedo')
/*Prints: 
{
    name: 'Somjit Nag',
    github: 'https://github.com/Suedo'
}
*/