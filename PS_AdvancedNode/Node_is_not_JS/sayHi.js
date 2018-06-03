function sayHi(name){
    console.log("Hi! I am " + name);    
}

if(require.main == module){
    // being run as a standalone script
    sayHi(process.argv[2]);
    console.log("**script**");    
}else{
    // being 'required' in
    module.exports = sayHi;
    console.log("**require**");
}